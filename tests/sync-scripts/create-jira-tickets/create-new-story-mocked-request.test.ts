import {expect, test, vi} from "vitest"
import {createStory} from "../../../specification/sync-scripts/lib/createStory"

test('Creating a new "story" ticket in Jira - mocked request', async () => {
    vi.mock("../../../specification/sync-scripts/create-jira-tickets/createStory.ts", async () => {
        return {
            createStory: () => {
                return 'TEST-2'
            }
        }
    })

    const data = {
        title: "test title",
        description: "test description",
    }

    const key = createStory(data)

    expect(key)
        .toEqual('TEST-2')
})
