import {downloadEpics} from "./downloadEpics"
import {extractJiraEpics} from "./extractJiraEpics"
import {storeEpics} from "./storeEpics"

export async function downloadFullSpec() {
    const downloadedEpics = await downloadEpics()

    if (!downloadedEpics) {
        console.error("Epic tickets could not be downloaded.")
        return
    }

    const extractedEpics = extractJiraEpics(downloadedEpics)

    storeEpics(extractedEpics)

    // download stories, acs, tests
    // ...
}
