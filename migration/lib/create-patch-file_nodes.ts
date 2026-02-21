import fs from "node:fs"

createPatchFile()
    .then((data) => {
        const path = __dirname + '/../../deployment/jobs/migrate-nodes/'
        const filename = 'patch.json'
        fs.writeFileSync(path + filename, JSON.stringify(data, null, 2))
    })

async function createPatchFile() {
    const jobName = process.argv[2]
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
            "value": `ghcr.io/more-cars/${packageName}:latest`
        },
        {
            "op": "add",
            "path": "/spec/template/spec/containers/0/env/-",
            "value": {
                "name": "MIGRATE_NODE_TYPE",
                "value": process.env.MIGRATE_NODE_TYPE
            }
        },
    ]
}
