import fs from "node:fs"

createPatchFile()
    .then((data) => {
        const path = __dirname + '/../../../deployment/jobs/smoke-test/'
        const filename = 'patch.json'
        fs.writeFileSync(path + filename, JSON.stringify(data, null, 2))
    })

async function createPatchFile() {
    const jobName = process.argv[2]
    const packageVersion = process.argv[3]
    const packageName = 'rest-api-rc'

    return [
        {
            "op": "replace",
            "path": "/metadata/name",
            "value": jobName
        },
        {
            "op": "replace",
            "path": "/spec/template/spec/containers/0/image",
            "value": `ghcr.io/more-cars/${packageName}:${packageVersion}`
        },
        {
            "op": "add",
            "path": "/spec/template/spec/containers/0/env/-",
            "value": {
                "name": "REPORTS_ENABLED",
                "value": process.env.REPORTS_ENABLED
            }
        },
        {
            "op": "add",
            "path": "/spec/template/spec/containers/0/env/-",
            "value": {
                "name": "REPORTS_PATH",
                "value": process.env.REPORTS_PATH
            }
        }
    ]
}
