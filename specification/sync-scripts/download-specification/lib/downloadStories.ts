import axios from "axios"
import {getJiraApiBaseUrl} from "./getJiraApiBaseUrl"
import {getJiraApiAuthKey} from "./getJiraApiAuthKey"
import type {JiraStory} from "./types/JiraStory"

export async function downloadStories() {
    let results: Array<JiraStory> = []
    let nextPageToken = null
    let moreResultsPagesAreAvailable = true

    try {
        do {
            const response = await requestNextPage(nextPageToken)
            results = results.concat(response.data.issues)
            nextPageToken = response.data.nextPageToken
            moreResultsPagesAreAvailable = !!nextPageToken
        } while (moreResultsPagesAreAvailable)
    } catch (e) {
        console.error(e)
    }

    return results
}

async function requestNextPage(nextPageToken: string | null) {
    return axios
        .post(getJiraApiBaseUrl() + 'search/jql', {
            "jql": 'project = MCA AND issuetype = Story AND status IN ("Ready for Implementation", "In Development", "In Approval", "In Release", "Done")',
            "fields": [
                "parent",
                "summary",
                "description",
                "customfield_10691", // user story
                "customfield_10732", // API Verb
                "customfield_10731", // API Path
                "customfield_10767", // Response options
                "fixVersions",
                "created",
                "updated",
            ],
            nextPageToken,
            "maxResults": 100,
        }, {
            headers: {
                'Authorization': `Basic ${getJiraApiAuthKey()}`,
                'Content-Type': 'application/json',
            }
        })
}
