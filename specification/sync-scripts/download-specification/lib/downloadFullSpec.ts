import {downloadEpics} from "./downloadEpics"
import {cacheJiraTickets} from "./cacheJiraTickets"
import {extractJiraEpics} from "./extractJiraEpics"
import {storeEpics} from "./storeEpics"
import {downloadStories} from "./downloadStories"
import {extractJiraStories} from "./extractJiraStories"
import {storeStories} from "./storeStories"
import {downloadAcceptanceCriteria} from "./downloadAcceptanceCriteria"
import {extractJiraAcceptanceCriteria} from "./extractJiraAcceptanceCriteria"
import {storeAcceptanceCriteria} from "./storeAcceptanceCriteria"

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

    // acceptance criteria
    const downloadedAcs = await downloadAcceptanceCriteria()
    if (!downloadedAcs) {
        console.error("Acceptance criteria tickets could not be downloaded.")
        return
    }
    cacheJiraTickets('acceptance_criteria', downloadedAcs)
    const extractedAcs = extractJiraAcceptanceCriteria(downloadedAcs)
    storeAcceptanceCriteria(extractedAcs)
}
