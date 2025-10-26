import fs from "node:fs"

createPatchFile_nodes()
    .then((data) => {
        const path = __dirname + '/../../deployment/jobs/migrate-nodes/'
        const filename = 'patch.json'
        fs.writeFileSync(path + filename, JSON.stringify(data, null, 2))
    })

async function createPatchFile_nodes() {
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
                "name": "DB_MC1_PASSWORD",
                "value": process.env.MIGRATION_SOURCE_DB_PASSWORD
            }
        },
        {
            "op": "add",
            "path": "/spec/template/spec/containers/0/env/-",
            "value": {
                "name": "DB_PASSWORD",
                "value": process.env.MIGRATION_TARGET_DB_PASSWORD
            }
        },
        {
            "op": "add",
            "path": "/spec/template/spec/containers/0/env/-",
            "value": {
                "name": "MIGRATE_NODE_TYPE",
                "value": process.env.MIGRATE_NODE_TYPE
            }
        },
        {
            "op": "add",
            "path": "/spec/template/spec/containers/0/env/-",
            "value": {
                "name": "DELETE_EXISTING_DATA",
                "value": process.env.DELETE_EXISTING_DATA
            }
        }
    ]
}
