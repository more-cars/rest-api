import axios from "axios"
import type {JiraEpic} from "./types/JiraEpic"
import {getJiraApiBaseUrl} from "./getJiraApiBaseUrl"
import {getJiraApiAuthKey} from "./getJiraApiAuthKey"

export async function downloadEpics(): Promise<false | Array<JiraEpic>> {
    try {
        const response = await axios
            .post(getJiraApiBaseUrl() + 'search/jql', {
                "jql": "project = MCA AND issuetype = Epic AND status = 'In Progress'",
                "fields": [
                    "summary",
                    "customfield_10764", // data structure field
                    "created",
                    "updated",
                ],
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
