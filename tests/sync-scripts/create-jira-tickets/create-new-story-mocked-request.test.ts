import {expect, test, vi} from "vitest"
import {createStory} from "../../../specification/sync-scripts/create-jira-tickets/lib/createStory"
import type {Story} from "../../../specification/sync-scripts/create-jira-tickets/lib/types/Story"

test('Creating a new "story" ticket in Jira - mocked request', async () => {
    vi.mock("../../../specification/sync-scripts/lib/createStory.ts", async () => {
        return {
            createStory: () => {
                return 'TEST-2'
            }
        }
    })

    const data: Story = {
        title: "test title",
        specificationList: [
            "spec 1",
            "spec 2",
            "spec 3",
        ],
        userStory: "test",
        apiVerb: "test",
        apiPath: "test",
        responseOptions: []
    }

    const key = await createStory(data)

    expect(key)
        .toEqual('TEST-2')
})
