import fs from "fs"

export function storeFeatureFile(feature: string, path: string, fileName: string, suffix: string = '.feature') {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, {recursive: true})
    }

    fs.writeFileSync(path + fileName + suffix, feature)
}
