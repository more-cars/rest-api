import {getJiraApiAuthKey} from "./getJiraApiAuthKey"

export function createStory(data: object): string {
    const apiKey = getJiraApiAuthKey()
    const ticketId = "MCA-1234"

    return ticketId
}
