import axios from "axios"
import {getJiraApiAuthKey} from "./getJiraApiAuthKey"
import {getJiraApiBaseUrl} from "./getJiraApiBaseUrl"
import type {AcceptanceCriterion} from "./AcceptanceCriterion"

export async function createAcceptanceCriterion(data: AcceptanceCriterion, parentId: string): Promise<string> {
    const response = await axios
        .post(getJiraApiBaseUrl() + 'issue', {
            fields: {
                'project': {
                    key: 'MCA'
                },
                'issuetype': {
                    id: '10166'
                },
                'parent': {
                    key: parentId
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
