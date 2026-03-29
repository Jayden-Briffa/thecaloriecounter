import { clientOpts, mySqlOpts } from "../db/dbOptions.js";
import { migrate } from "./migrate.js";

migrate({
    dbName: `\`${process.env.MYSQL_DATABASE}\``,
    poolOptions: {...mySqlOpts, ...clientOpts},
})