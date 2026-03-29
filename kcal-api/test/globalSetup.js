import { clientOpts, mySqlOpts } from "../db/dbOptions.js";
import { migrate } from "../migration-tool/migrate.js";

export default async function globalSetup() {
    await migrate({
        dbName: `\`${process.env.MYSQL_TEST_DATABASE}\``,
        poolOptions: {...mySqlOpts, ...clientOpts},
        nukeDb: true,
        noLog: true
    })
}