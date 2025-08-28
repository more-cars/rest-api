import fs from "fs"

export function getDashboardExportPath() {
    const path = __dirname + '/../../../test-reports/performance/'

    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, {recursive: true})
    }

    return path + 'dashboard.html'
}
