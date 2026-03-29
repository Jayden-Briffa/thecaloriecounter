import { createPool } from "mysql2/promise";
import { clientOpts, mySqlOpts } from "../db/dbOptions.js";
import executeSqlFile from "../executeSqlFile.js";
import fs from "fs"
import crypto from "crypto"

const MIGRATIONS_PATH = "migration-tool/migrations"

function createChecksum(data) {
    const hash = crypto.createHash("md5")
    hash.update(data)

    return hash.digest("hex")
}

async function triggerMigration(pool, applied) {
    try {
        const migrationFileRegex = /^V[0-9]+__.*\.sql$/
        const migrationFiles = fs.readdirSync(MIGRATIONS_PATH)
        .filter((fileName) => migrationFileRegex.test(fileName))
        
        // Create mapping of versions to version data from migration files
        const migrations = migrationFiles.map((fileName) => {
            const splitFileName = fileName.split("__")
            const version = Number(splitFileName[0].split("V")[1])
            const description = splitFileName[1].split(".sql")[0]

            const sql = fs.readFileSync(`${MIGRATIONS_PATH}/${fileName}`, "utf-8")
            const checksum = createChecksum(sql)
    
            return {
                version,
                description,
                checksum,
                fileName,
            }
        }).sort((a, b) => a.version - b.version) // Sorts in ascending order

        // Error if version gaps are detected
        for (let i = 1; i < migrations.length; i++) {
            const prev = migrations[i - 1].version;
            const curr = migrations[i].version;

            if (curr !== prev + 1) {
                throw new Error(`Gap detected: V${prev} → V${curr} (${migrations[i].fileName})`);
            }
        }

        // Error if duplicate versions are detected
        const seen = new Set();
        for (const m of migrations) {
            if (seen.has(m.version)) {
                throw new Error(`Duplicate migration version: V${m.version}`);
            }
            seen.add(m.version);
        }

        // Error if checksum in db !== newly-created checksum
        for (const m of migrations) {
             if (applied.has(m.version)){
                if (applied.get(m.version).checksum !== m.checksum){
                    throw new Error(`Changes detected in: ${m.fileName}`)
                }
            }
        }
        
        // Check for any gaps in db Versions history
        let flagGapInHistory = false;
        for (const [version] of applied){
            if (!applied.has(version - 1)){
                flagGapInHistory = true;
                break;
            }
        }

        let previousMigrationVersion = null;
        let newMigrationVersion;
        let executedMigrations = []
        for (const { version, description, checksum, fileName } of migrations) {
            newMigrationVersion = `V${version}` 
            if (applied.has(version)){
                previousMigrationVersion = version
                continue
            }
            
            
            const conn = await pool.getConnection();
            await conn.beginTransaction();
            
            try {
                console.log("Executing:", fileName, version)
                
                // Right now we are just testing so ignore that executeSqlFile() is commented out
                // await executeSqlFile(`${MIGRATIONS_PATH}/${fileName}`, conn)
                await conn.query("INSERT INTO Versions (id, description , checksum) VALUES (?, ?, ?)", [
                    version,
                    description,
                    checksum,
                ]);
                await conn.commit();
                
                executedMigrations.push(`V${version}`)
                
            } catch (e) {
                // Does not add row to Versions
                await conn.rollback();
                throw new Error(`Error executing ${fileName}: ${e.message}`)  
            } finally {
                conn.release();
            }
    
        }

        const previousMigrationVersionStr = `V${previousMigrationVersion}`
        const banner = "=".repeat(5) + ` MIGRATION SUMMARY ` + "=".repeat(5)
        console.log(banner)

        if (executedMigrations.length !== 0) {
            console.log("Executed: ", executedMigrations.join(", "))
            if (!flagGapInHistory) {
                console.log(`From ${previousMigrationVersionStr} => ${newMigrationVersion}`)
            } else {
                console.log(`New migration version (there were gaps in the version history): ${newMigrationVersion}`)
            }
        } else {
            console.log(`No changes made, the database is at version: ${previousMigrationVersionStr}`)
        }


        console.log("=".repeat(banner.length))

    } catch (e){
        throw new Error(`Error during migration: ${e.message}`)
    }
}

async function migrate(){
    const dbName = process.env.NODE_ENV !== "test" ? `\`${process.env.MYSQL_DATABASE}\`` : `\`${process.env.MYSQL_TEST_DATABASE}\``
    const pool = createPool({...mySqlOpts, ...clientOpts, multipleStatements: true})
    await pool.query(`CREATE DATABASE  IF NOT EXISTS ${dbName}`)
    await pool.query(`USE ${dbName}`)

    // Check for previous migrations. Assume no migrations ever existed if Versions doesn't exist. This will likely cause an error
    // if executed on a current database
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Versions (
            id INT,
            description TINYTEXT,
            checksum VARCHAR(32),
            \`completed_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        )
    `);
    const [rows] = await pool.query("SELECT id, checksum FROM Versions")
    const applied = new Map(rows.map(row => [row.id, {...row}]))

    await triggerMigration(pool, applied)

    await pool.end()
}

migrate()