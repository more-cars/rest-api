import type {JiraEpic} from "./types/JiraEpic"
import type {Epic} from "./types/Epic"

export function extractJiraEpics(epics: Array<JiraEpic>): Array<Epic> {
    const extractedEpics: Array<Epic> = []

    epics.forEach(jiraEpic => {
        extractedEpics.push({
            id: jiraEpic.key,
            title: jiraEpic.fields.summary,
            data_structure: jiraEpic.fields.customfield_10764,
            created_at: jiraEpic.fields.created,
            updated_at: jiraEpic.fields.updated,
        } as Epic)
    })

    return extractedEpics
}
