import axios from "axios"
import {getJiraApiAuthKey} from "./getJiraApiAuthKey"
import {getJiraApiBaseUrl} from "./getJiraApiBaseUrl"
import type {Story} from "./Story"

export async function createStory(data: Story): Promise<string> {
    const response = await axios
        .post(getJiraApiBaseUrl() + 'issue', {
            fields: {
                'project': {
                    key: 'MCA'
                },
                'issuetype': {
                    id: '10001'
                },
                'summary': data.title,
                'description': {
                    version: 1,
                    type: 'doc',
                    content: [
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": data.description,
                                },
                            ]
                        }
                    ]
                },
            }
        }, {
            headers: {
                'Authorization': `Basic ${getJiraApiAuthKey()}`,
                'Content-Type': 'application/json',
            }
        })

    return response.data.key
}
