import {expect, test} from "vitest"
import {createStory} from "../../../specification/sync-scripts/create-jira-tickets/createStory"

test.skip('Creating a new "story" ticket in Jira - real request', async () => {
    const data = {
        title: "test title",
        description: "test description",
    }

    const key = await createStory(data)

    console.log(key)

    expect(key)
        .toContain('MCA-')
})
