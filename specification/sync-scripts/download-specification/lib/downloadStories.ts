import axios from "axios"
import {getJiraApiBaseUrl} from "./getJiraApiBaseUrl"
import {getJiraApiAuthKey} from "./getJiraApiAuthKey"

export async function downloadStories() {
    try {
        const response = await axios
            .post(getJiraApiBaseUrl() + 'search/jql', {
                "jql": "project = MCA AND issuetype = Story",
                "fields": [
                    "parent",
                    "summary",
                    "description",
                    "customfield_10691", // user story
                    "customfield_10732", // API Verb
                    "customfield_10731", // API Path
                    "customfield_10767", // Response options
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
