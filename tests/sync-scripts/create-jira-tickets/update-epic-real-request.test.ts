import {expect, test} from "vitest"
import type {Epic} from "../../../ticket-generator/lib/types/Epic"
import {updateEpic} from "../../../ticket-generator/lib/updateEpic"

test('Updating epic ticket in Jira - real request', async () => {
    const data: Epic = {
        jiraId: "MCA-498",
        dataStructure: [{
            name: "name",
            mandatory: true,
            datatype: "string",
            example: "test",
        }, {
            name: "headquarters",
            mandatory: false,
            datatype: "number",
            example: "test",
        }]
    }

    const responseStatusCode = await updateEpic(data)

    expect(responseStatusCode)
        .toEqual(204)
})
