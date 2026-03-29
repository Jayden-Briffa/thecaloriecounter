import crypto from "crypto"
import { readFile } from "fs/promises"

function createChecksum(data) {
    const hash = crypto.createHash("md5")
    hash.update(data)

    return hash.digest("hex")
}

const data = readFile("./migration-tool/migrations/V2__first_dummy.sql", 'utf-8').then((data) => {
    const checksum = createChecksum(data)
    console.log(checksum)
})