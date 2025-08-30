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
        },
        {
            "op": "add",
            "path": "/spec/template/spec/containers/0/env/-",
            "value": {
                "name": "REPORTS_ENABLED",
                "value": process.env.REPORTS_ENABLED
            }
        }
    ]
}
