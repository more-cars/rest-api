import fs from "node:fs"

createPatchFile()
    .then((data) => {
        const path = __dirname + '/../../../deployment/jobs/performance-test/'
        const filename = 'patch.json'
        fs.writeFileSync(path + filename, JSON.stringify(data, null, 2))
    })

async function createPatchFile() {
    const jobName = process.argv[2]

    return [
        {
            "op": "replace",
            "path": "/metadata/name",
            "value": jobName
        },
        {
            "op": "add",
            "path": "/spec/template/spec/containers/0/env/-",
            "value": {
                "name": "SCENARIO",
                "value": process.env.SCENARIO
            }
        },
        {
            "op": "add",
            "path": "/spec/template/spec/containers/0/env/-",
            "value": {
                "name": "K6_WEB_DASHBOARD",
                "value": process.env.K6_WEB_DASHBOARD
            }
        },
        {
            "op": "add",
            "path": "/spec/template/spec/containers/0/env/-",
            "value": {
                "name": "K6_WEB_DASHBOARD_EXPORT",
                "value": process.env.K6_WEB_DASHBOARD_EXPORT
            }
        }
    ]
}
