import {assert, expect, test} from "vitest"
import {validateJson} from "../../_toolbox/validateJson.ts"
import {downloadStories} from "../../../specification/sync-scripts/download-specification/lib/downloadStories"
import {
    GetStoriesResponseSchema
} from "../../../specification/sync-scripts/download-specification/lib/schemas/GetStoriesResponseSchema"

test('Downloading all stories from Jira - real request', async () => {
    const jiraStories = await downloadStories()

    if (!jiraStories) {
        assert(false, 'Stories could not be loaded.')
    }

    expect(jiraStories.length)
        .toBeGreaterThan(0)

    expect(validateJson(jiraStories, GetStoriesResponseSchema))
        .toBeTruthy()
})
