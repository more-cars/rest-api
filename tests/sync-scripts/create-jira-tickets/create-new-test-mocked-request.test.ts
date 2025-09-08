import {expect, test, vi} from "vitest"
import {createTest} from "../../../specification/sync-scripts/lib/createTest"

test('Creating a new "test" ticket in Jira - mocked request', async () => {
    vi.mock("../../../specification/sync-scripts/create-jira-tickets/createTest.ts", async () => {
        return {
            createTest: () => {
                return 'TEST-4'
            }
        }
    })

    const data = {
        title: "test title",
        description: "test description",
    }

    const key = createTest(data)

    expect(key)
        .toEqual('TEST-4')
})
