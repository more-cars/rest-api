import fs from "node:fs"
import {getHostname} from "./getHostname.ts";

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

createApiIngressPatchFile()
    .then((data) => {
        const path = __dirname + '/../app/'
        const filename = 'ingress.patch.json'
        fs.writeFileSync(path + filename, JSON.stringify(data, null, 2))
    })

createDbIngressPatchFile()
    .then((data) => {
        const path = __dirname + '/../app/'
        const filename = 'db-ingress.patch.json'
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

async function createApiIngressPatchFile() {
    const targetEnvironment = process.env.TARGET_ENVIRONMENT || 'prod'
    const targetCluster = process.env.TARGET_CLUSTER || 'gke'

    return [
        {
            "op": "replace",
            "path": "/spec/rules/0/host",
            "value": getHostname(targetCluster, targetEnvironment, 'api'),
        },
        {
            "op": "replace",
            "path": "/spec/rules/1/host",
            "value": getHostname(targetCluster, targetEnvironment, 'swagger'),
        },
        {
            "op": "replace",
            "path": "/spec/tls/0/hosts/0",
            "value": getHostname(targetCluster, targetEnvironment, 'api'),
        },
        {
            "op": "replace",
            "path": "/spec/tls/1/hosts/0",
            "value": getHostname(targetCluster, targetEnvironment, 'swagger'),
        },
    ]
}


async function createDbIngressPatchFile() {
    const targetEnvironment = process.env.TARGET_ENVIRONMENT || 'prod'
    const targetCluster = process.env.TARGET_CLUSTER || 'gke'
    const hostname = getHostname(targetCluster, targetEnvironment, 'db')

    return [
        {
            "op": "replace",
            "path": "/spec/rules/0/host",
            "value": hostname,
        },
        {
            "op": "replace",
            "path": "/spec/tls/0/hosts/0",
            "value": hostname,
        },
        {
            "op": "replace",
            "path": "/metadata/annotations/nginx.ingress.kubernetes.io~1permanent-redirect",
            "value": "https://" + hostname + ":30473",
        },
    ]
}
