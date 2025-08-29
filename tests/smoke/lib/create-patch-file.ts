import fs from "node:fs"

createPatchFile()
    .then((data) => {
        const path = __dirname + '/../../../deployment/jobs/smoke-test/'
        const filename = 'patch.json'
        fs.writeFileSync(path + filename, JSON.stringify(data, null, 2))
    })

async function createPatchFile() {
    return [
        {
            "op": "replace",
            "path": "/metadata/name",
            "value": "smoke-test-" + Date.now()
        }
    ]
}
