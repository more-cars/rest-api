import fs from "node:fs"
import {getHostname} from "./getHostname.ts"

createApiDeploymentPatchFile()
    .then((data) => {
        const path = __dirname + '/../app/'
        const filename = 'api-deployment.patch.json'
        fs.writeFileSync(path + filename, JSON.stringify(data, null, 2))
    })

createOpenApiDeploymentPatchFile()
    .then((data) => {
        const path = __dirname + '/../app/'
        const filename = 'openapi-spec-deployment.patch.json'
        fs.writeFileSync(path + filename, JSON.stringify(data, null, 2))
    })

createApiHttpRoutePatchFile()
    .then((data) => {
        const path = __dirname + '/../app/'
        const filename = 'api-http-route.patch.json'
        fs.writeFileSync(path + filename, JSON.stringify(data, null, 2))
    })

createOpenapiSpecHttpRoutePatchFile()
    .then((data) => {
        const path = __dirname + '/../app/'
        const filename = 'openapi-spec-http-route.patch.json'
        fs.writeFileSync(path + filename, JSON.stringify(data, null, 2))
    })

createDbHttpRoutePatchFile()
    .then((data) => {
        const path = __dirname + '/../app/'
        const filename = 'db-http-route.patch.json'
        fs.writeFileSync(path + filename, JSON.stringify(data, null, 2))
    })

async function createApiDeploymentPatchFile() {
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

async function createOpenApiDeploymentPatchFile() {
    const targetEnvironment = process.env.TARGET_ENVIRONMENT || 'prod'
    const targetCluster = process.env.TARGET_CLUSTER || 'gke'
    const hostname = getHostname(targetCluster, targetEnvironment, 'api')

    return [
        {
            "op": "replace",
            "path": "/spec/template/spec/containers/0/env/0",
            "value": {
                "name": "URL",
                "value": `https://${hostname}`,
            },
        },
    ]
}

async function createApiHttpRoutePatchFile() {
    const targetEnvironment = process.env.TARGET_ENVIRONMENT || 'prod'
    const targetCluster = process.env.TARGET_CLUSTER || 'gke'

    return [
        {
            "op": "replace",
            "path": "/spec/hostnames/0",
            "value": getHostname(targetCluster, targetEnvironment, 'api'),
        },
    ]
}

async function createOpenapiSpecHttpRoutePatchFile() {
    const targetEnvironment = process.env.TARGET_ENVIRONMENT || 'prod'
    const targetCluster = process.env.TARGET_CLUSTER || 'gke'

    return [
        {
            "op": "replace",
            "path": "/spec/hostnames/0",
            "value": getHostname(targetCluster, targetEnvironment, 'swagger'),
        },
    ]
}

async function createDbHttpRoutePatchFile() {
    const targetEnvironment = process.env.TARGET_ENVIRONMENT || 'prod'
    const targetCluster = process.env.TARGET_CLUSTER || 'gke'

    return [
        {
            "op": "replace",
            "path": "/spec/hostnames/0",
            "value": getHostname(targetCluster, targetEnvironment, 'db'),
        },
    ]
}
