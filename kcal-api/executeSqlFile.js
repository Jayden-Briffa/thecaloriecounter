import fs from 'fs/promises';

async function executeSqlFile(filePath, pool, defaultDbName=null, testDbName=null){
    const sql = await fs.readFile(filePath, 'utf-8');

    let cleaned = sql
    if (defaultDbName && testDbName){
        console.log("Replacing:", defaultDbName, testDbName)
        cleaned = cleaned.replaceAll(defaultDbName, testDbName)
    }
    
    await pool.query(cleaned);
}

export default executeSqlFile
