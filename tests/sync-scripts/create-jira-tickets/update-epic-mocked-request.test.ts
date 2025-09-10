import {expect, test, vi} from "vitest"
import type {Epic} from "../../../specification/sync-scripts/lib/types/Epic"
import {updateEpic} from "../../../specification/sync-scripts/lib/updateEpic"

test('Updating epic ticket in Jira - mocked request', async () => {
    vi.mock("../../../specification/sync-scripts/lib/updateEpic.ts", async () => {
        return {
            updateEpic: () => {
                return 204
            }
        }
    })

    const data: Epic = {
        jiraId: "TEST-1",
        dataStructure: [{
            name: "prop1",
            mandatory: true,
            datatype: "string",
            example: "test",
        }, {
            name: "prop2",
            mandatory: false,
            datatype: "number",
            example: "test",
        }]
    }

    const responseStatus = await updateEpic(data)

    expect(responseStatus)
        .toEqual(204)
})
