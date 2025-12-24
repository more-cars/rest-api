import fs from "node:fs"

createPatchFile()
    .then((data) => {
        const path = __dirname + '/../app/'
        const filename = 'patch.json'
        fs.writeFileSync(path + filename, JSON.stringify(data, null, 2))
    })

createIngressPatchFile()
    .then((data) => {
        const path = __dirname + '/../app/'
        const filename = 'ingress.patch.json'
        fs.writeFileSync(path + filename, JSON.stringify(data, null, 2))
    })

async function createPatchFile() {
    const packageName = process.env.PACKAGE_NAME
    const packageVersion = process.env.PACKAGE_VERSION

    return [
        {
            "op": "replace",
            "path": "/spec/template/spec/containers/0/image",
            "value": `ghcr.io/more-cars/${packageName}:${packageVersion}`
        }
    ]
}

async function createIngressPatchFile() {
    const targetEnvironment = process.env.TARGET_ENVIRONMENT

    return [
        {
            "op": "replace",
            "path": "/spec/rules/0/host",
            "value": targetEnvironment + ".api.more-cars.internal",
        },
        {
            "op": "replace",
            "path": "/spec/rules/1/host",
            "value": targetEnvironment + ".swagger.more-cars.internal",
        },
        {
            "op": "replace",
            "path": "/spec/rules/2/host",
            "value": targetEnvironment + ".db.more-cars.internal",
        },
        {
            "op": "replace",
            "path": "/spec/tls/0/hosts/0",
            "value": targetEnvironment + ".api.more-cars.internal",
        },
        {
            "op": "replace",
            "path": "/spec/tls/1/hosts/0",
            "value": targetEnvironment + ".swagger.more-cars.internal",
        },
        {
            "op": "replace",
            "path": "/spec/tls/2/hosts/0",
            "value": targetEnvironment + ".db.more-cars.internal",
        }
    ]
}
