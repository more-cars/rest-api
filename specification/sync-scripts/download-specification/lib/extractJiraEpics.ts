import type {JiraEpic} from "./types/JiraEpic"
import type {Epic} from "./types/Epic"
import {toMarkdown} from "mdast-util-to-markdown"
import {fromADF} from "mdast-util-from-adf"

export function extractJiraEpics(epics: Array<JiraEpic>): Array<Epic> {
    const extractedEpics: Array<Epic> = []

    epics.forEach(jiraEpic => {
        extractedEpics.push({
            id: jiraEpic.key,
            title: jiraEpic.fields.summary,
            data_structure: extractDataStrucure(jiraEpic.fields.customfield_10764),
            created_at: jiraEpic.fields.created,
            updated_at: jiraEpic.fields.updated,
        } as Epic)
    })

    return extractedEpics
}

function extractDataStrucure(doc: any) {
    if (!doc) {
        return ''
    }

    // @ts-expect-error TS2345
    return toMarkdown(fromADF(doc))
}
