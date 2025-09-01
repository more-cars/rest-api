import fs from "node:fs"

createPatchFile()
    .then((data) => {
        const path = __dirname + '/../app/'
        const filename = 'patch.json'
        fs.writeFileSync(path + filename, JSON.stringify(data, null, 2))
    })

async function createPatchFile() {
    const versionNumber = process.argv[2]

    return [
        {
            "op": "replace",
            "path": "/spec/template/spec/containers/0/image",
            "value": "docker.io/dennisgerike/more-cars-api:" + versionNumber
        }
    ]
}
