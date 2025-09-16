import type {JiraStory} from "./types/JiraStory"
import type {Story} from "./types/Story"
import {fromADF} from "mdast-util-from-adf"
import {toMarkdown} from "mdast-util-to-markdown"

export function extractJiraStories(stories: Array<JiraStory>): Array<Story> {
    const extractedStories: Array<Story> = []

    stories.forEach(jiraStory => {
        extractedStories.push({
            id: jiraStory.key,
            parent_id: jiraStory.fields.parent.key,
            title: jiraStory.fields.summary,
            user_story: extractUserStory(jiraStory.fields.customfield_10691),
            description: extractDescription(jiraStory.fields.description),
            api_verb: jiraStory.fields.customfield_10732?.value || null,
            api_path: jiraStory.fields.customfield_10731,
            response_options: jiraStory.fields.customfield_10767?.map(item => item.value) || [],
            release_versions: jiraStory.fields.fixVersions?.map(item => item.name) || [],
            created_at: jiraStory.fields.created,
            updated_at: jiraStory.fields.updated,
        } as Story)
    })

    return extractedStories
}

function extractUserStory(doc: any) {
    if (!doc) {
        return ''
    }

    // @ts-expect-error TS2345
    return toMarkdown(fromADF(doc))
}

function extractDescription(doc: any) {
    if (!doc) {
        return ''
    }

    // @ts-expect-error TS2345
    return toMarkdown(fromADF(doc))
}

