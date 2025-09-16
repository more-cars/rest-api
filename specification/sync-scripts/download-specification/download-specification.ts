import type {ReferenceTicket} from "./lib/types/ReferenceTicket"
import {downloadEpics} from "./lib/downloadEpics"
import {cacheJiraTickets, cacheXrayTickets} from "./lib/cacheJiraTickets"
import {extractJiraEpics} from "./lib/extractJiraEpics"
import {storeEpics} from "./lib/storeEpics"
import {downloadStories} from "./lib/downloadStories"
import {extractJiraStories} from "./lib/extractJiraStories"
import {storeStories} from "./lib/storeStories"
import {downloadAcceptanceCriteria} from "./lib/downloadAcceptanceCriteria"
import {extractJiraAcceptanceCriteria} from "./lib/extractJiraAcceptanceCriteria"
import {storeAcceptanceCriteria} from "./lib/storeAcceptanceCriteria"
import {downloadTests} from "./lib/downloadTests"
import {extractXrayTests} from "./lib/extractXrayTests"
import {storeTests} from "./lib/storeTests"

export async function downloadFullSpec() {
    let ticketList: Array<ReferenceTicket> = []

    // epics
    const downloadedEpics = await downloadEpics()
    if (!downloadedEpics) {
        console.error("Epic tickets could not be downloaded.")
        return
    }
    cacheJiraTickets('epic', downloadedEpics)
    const extractedEpics = extractJiraEpics(downloadedEpics)
    const storedEpics = storeEpics(extractedEpics, ticketList)
    ticketList = ticketList.concat(storedEpics)
    console.log('Epics downloaded: ' + extractedEpics.length)

    // stories
    const downloadedStories = await downloadStories()
    if (!downloadedStories) {
        console.error("Story tickets could not be downloaded.")
        return
    }
    cacheJiraTickets('story', downloadedStories)
    const extractedStories = extractJiraStories(downloadedStories)
    const storedStories = storeStories(extractedStories, ticketList)
    ticketList = ticketList.concat(storedStories)
    console.log('Stories downloaded: ' + extractedStories.length)

    // acceptance criteria
    const downloadedAcs = await downloadAcceptanceCriteria()
    if (!downloadedAcs) {
        console.error("Acceptance criteria tickets could not be downloaded.")
        return
    }
    cacheJiraTickets('acceptance_criteria', downloadedAcs)
    const extractedAcs = extractJiraAcceptanceCriteria(downloadedAcs)
    const storedAcceptanceCriteria = storeAcceptanceCriteria(extractedAcs, ticketList)
    ticketList = ticketList.concat(storedAcceptanceCriteria)
    console.log('Acceptance Criteria downloaded: ' + extractedAcs.length)

    // tests
    const downloadedTests = await downloadTests()
    if (!downloadedTests) {
        console.error("Test tickets could not be downloaded.")
        return
    }
    cacheXrayTickets('test', downloadedTests)
    const extractedTests = extractXrayTests(downloadedTests)
    storeTests(extractedTests, ticketList)
    console.log('Tests downloaded: ' + extractedTests.length)
}

downloadFullSpec().then(r => true)
