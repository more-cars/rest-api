import axios from "axios"
import {getJiraApiBaseUrl} from "./getJiraApiBaseUrl"
import {getJiraApiAuthKey} from "./getJiraApiAuthKey"

export async function downloadAcceptanceCriteria() {
    try {
        const response = await axios
            .post(getJiraApiBaseUrl() + 'search/jql', {
                "jql": "project = MCA AND issuetype = 'Acceptance Criteria'",
                "fields": [
                    "parent",
                    "summary",
                    "description",
                    "created",
                    "updated",
                ],
                "maxResults": 1000,
            }, {
                headers: {
                    'Authorization': `Basic ${getJiraApiAuthKey()}`,
                    'Content-Type': 'application/json',
                }
            })
        return response.data.issues
    } catch (e) {
        console.error(e)
    }

    return false
}
