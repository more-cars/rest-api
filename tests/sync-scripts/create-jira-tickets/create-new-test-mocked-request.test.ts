import {expect, test, vi} from "vitest"
import {createTest} from "../../../ticket-generator/lib/createTest"
import type {Test} from "../../../ticket-generator/lib/types/Test"

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
        gherkin: 'test gherkin',
    }

    const key = await createTest(data)

    expect(key)
        .toEqual('TEST-4')
})
