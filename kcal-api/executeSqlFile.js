import fs from 'fs/promises';

async function executeSqlFile(filePath, pool, defaultDbName=null, testDbName=null){
    const sql = await fs.readFile(filePath, 'utf-8');

    let cleaned = sql
    if (defaultDbName && testDbName){
        cleaned = cleaned.replace(defaultDbName, testDbName)
    }
    
    // Split by semicolon, trim, and filter empty
    const statements = cleaned
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);
    
    for (const statement of statements) {
        await pool.query(statement);
    }
    console.log(`✓ Executed ${statements.length} statements`);
}

export default executeSqlFile
