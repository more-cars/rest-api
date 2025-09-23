import {expect, test, vi} from "vitest"
import {createAcceptanceCriterion} from "../../../ticket-generator/lib/createAcceptanceCriterion"
import type {AcceptanceCriterion} from "../../../ticket-generator/lib/types/AcceptanceCriterion"

test('Creating a new "AC" ticket in Jira - mocked request', async () => {
    vi.mock("../../../specification/sync-scripts/lib/createAcceptanceCriterion.ts", async () => {
        return {
            createAcceptanceCriterion: () => {
                return 'TEST-3'
            }
        }
    })

    const data: AcceptanceCriterion = {
        title: "test title",
        description: "test description",
        responseCode: "666"
    }

    const key = await createAcceptanceCriterion(data, 'TEST-2')

    expect(key)
        .toEqual('TEST-3')
})
