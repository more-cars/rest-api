import {downloadEpics} from "./downloadEpics"
import {cacheJiraTickets} from "./cacheJiraTickets"
import {extractJiraEpics} from "./extractJiraEpics"
import {storeEpics} from "./storeEpics"
import {downloadStories} from "./downloadStories"
import {extractJiraStories} from "./extractJiraStories"
import {storeStories} from "./storeStories"

export async function downloadFullSpec() {
    // epics
    const downloadedEpics = await downloadEpics()
    if (!downloadedEpics) {
        console.error("Epic tickets could not be downloaded.")
        return
    }
    cacheJiraTickets('epic', downloadedEpics)
    const extractedEpics = extractJiraEpics(downloadedEpics)
    storeEpics(extractedEpics)

    // stories
    const downloadedStories = await downloadStories()
    if (!downloadedStories) {
        console.error("Story tickets could not be downloaded.")
        return
    }
    cacheJiraTickets('story', downloadedStories)
    const extractedStories = extractJiraStories(downloadedStories)
    storeStories(extractedStories)
}
