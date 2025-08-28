import fs from "node:fs"
import {getTargetEnvironment} from "./getTargetEnvironment"
import {getApiUrl} from "./getApiUrl"
import {getTestScenario} from "./getTestScenario"
import {isDashboardEnabled} from "./isDashboardEnabled"
import {getDashboardExportPath} from "./getDashboardExportPath"
import {isDashboardOpenedInBrowser} from "./isDashboardOpenedInBrowser"
import {getDashboardRefreshRate} from "./getDashboardRefreshRate"

const data = `
export TARGET_ENVIRONMENT=${getTargetEnvironment()}
export API_URL=${getApiUrl()}
export TEST_FILE_PATH=${getTestScenario()}
export K6_WEB_DASHBOARD=${isDashboardEnabled()}
export K6_WEB_DASHBOARD_EXPORT=${getDashboardExportPath()}
export K6_WEB_DASHBOARD_OPEN=${isDashboardOpenedInBrowser()}
export K6_WEB_DASHBOARD_PERIOD=${getDashboardRefreshRate()}
`
const filename = process.argv[2]

fs.writeFileSync(__dirname + '/../' + filename, data)
