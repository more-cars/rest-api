import {expect, test} from "vitest"
import {createStory} from "../../../specification/sync-scripts/lib/createStory"
import type {Story} from "../../../specification/sync-scripts/lib/types/Story"

test.skip('Creating a new "story" ticket in Jira - real request', async () => {
    const data: Story = {
        title: "test title",
        specificationList: [
            "test spec 1",
            "test spec 2",
            "test spec 3",
        ],
        userStory: "As a...\n I want to...\n So I can...",
        apiVerb: "POST",
        apiPath: "/test-path",
        responseOptions: [
            "201",
            "404",
        ]
    }

    const key = await createStory(data)

    console.log(key)

    expect(key)
        .toContain('MCA-')
})
