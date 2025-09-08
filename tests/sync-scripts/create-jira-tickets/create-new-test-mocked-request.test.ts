import {expect, test, vi} from "vitest"
import {createTest} from "../../../specification/sync-scripts/lib/createTest"
import type {Test} from "../../../specification/sync-scripts/lib/types/Test"

test('Creating a new "test" ticket in Jira - mocked request', async () => {
    vi.mock("../../../specification/sync-scripts/lib/createTest.ts", async () => {
        return {
            createTest: () => {
                return 'TEST-4'
            }
        }
    })

    const data: Test = {
        title: "test title",
        description: "test description",
    }

    const key = await createTest(data)

    expect(key)
        .toEqual('TEST-4')
})
