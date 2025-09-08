import {expect, test} from "vitest"
import {createStory} from "../../../specification/sync-scripts/lib/createStory"
import type {Story} from "../../../specification/sync-scripts/lib/types/Story"

test.skip('Creating a new "story" ticket in Jira - real request', async () => {
    const data: Story = {
        title: "test title",
        description: "test description",
        userStory: "As a... I want to... So I can...",
        apiVerb: "POST",
        apiPath: "/test-path",
        responseOptions: [
            "201",
            "404",
        ]
    }

    const key = await createStory(data)

    expect(key)
        .toContain('MCA-')
})
