import axios from "axios"
import type {JiraEpic} from "./types/JiraEpic"
import {getJiraApiBaseUrl} from "./getJiraApiBaseUrl"
import {getJiraApiAuthKey} from "./getJiraApiAuthKey"

export async function downloadEpics(): Promise<false | Array<JiraEpic>> {
    let results: Array<JiraEpic> = []
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
            "jql": 'project = MCA AND issuetype = Epic AND status IN ("In Progress", "Done")',
            "fields": [
                "summary",
                "customfield_10764", // data structure field
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
