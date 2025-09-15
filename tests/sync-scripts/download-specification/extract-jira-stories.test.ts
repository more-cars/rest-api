import fs from "fs"
import {expect, test} from "vitest"
import {validateJson} from "../../_toolbox/validateJson.ts"
import {StorySchema} from "./schemas/StorySchema"
import type {JiraStory} from "../../../specification/sync-scripts/download-specification/lib/types/JiraStory"
import {extractJiraStories} from "../../../specification/sync-scripts/download-specification/lib/extractJiraStories"

test('Extracting all story data from the Jira response', async () => {
    const jiraStories: Array<JiraStory> = JSON.parse(
        fs.readFileSync(__dirname + '/../../_toolbox/fixtures/specification/jira_story_collection.json', {
            encoding: 'utf8',
            flag: 'r'
        }))

    const extractedStories = extractJiraStories(jiraStories)

    expect(extractedStories.length)
        .toEqual(jiraStories.length)

    extractedStories.forEach((story) => {
        expect(validateJson(story, StorySchema))
            .toBeTruthy()
    })
})
