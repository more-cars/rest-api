import {expect, test, vi} from "vitest"
import {
    createAcceptanceCriterion
} from "../../../specification/sync-scripts/create-jira-tickets/createAcceptanceCriterion"

test('Creating a new "AC" ticket in Jira - mocked request', async () => {
    vi.mock("../../../specification/sync-scripts/create-jira-tickets/createAcceptanceCriterion.ts", async () => {
        return {
            createAcceptanceCriterion: () => {
                return 'TEST-3'
            }
        }
    })

    const data = {
        title: "test title",
        description: "test description",
    }

    const key = createAcceptanceCriterion(data, 'TEST-2')

    expect(key)
        .toEqual('TEST-3')
})
