import {expect, test} from "vitest"
import {createStory} from "../../../specification/sync-scripts/lib/createStory"

test.skip('Creating a new "story" ticket in Jira - real request', async () => {
    const data = {
        title: "test title",
        description: "test description",
    }

    const key = await createStory(data)

    expect(key)
        .toContain('MCA-')
})
