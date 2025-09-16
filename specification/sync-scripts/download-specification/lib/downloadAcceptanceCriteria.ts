import axios from "axios"
import {getJiraApiBaseUrl} from "./getJiraApiBaseUrl"
import {getJiraApiAuthKey} from "./getJiraApiAuthKey"
import type {JiraAcceptanceCriterion} from "./types/JiraAcceptanceCriterion"

export async function downloadAcceptanceCriteria() {
    let results: Array<JiraAcceptanceCriterion> = []
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
            "jql": 'project = MCA AND issuetype = "Acceptance Criteria" AND status IN ("Ready for Implementation", "In Development", "In Deployment", "Done")',
            "fields": [
                "parent",
                "summary",
                "description",
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
