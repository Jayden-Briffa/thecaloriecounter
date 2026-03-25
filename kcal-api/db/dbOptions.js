const clientOpts = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT
}

const mySqlOpts = {
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
}

export default { clientOpts, mySqlOpts }