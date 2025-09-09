import {expect, test} from "vitest"
import {createAcceptanceCriterion} from "../../../specification/sync-scripts/lib/createAcceptanceCriterion"
import type {AcceptanceCriterion} from "../../../specification/sync-scripts/lib/types/AcceptanceCriterion"

test.skip('Creating a new "AC" ticket in Jira - real request', async () => {
    const data: AcceptanceCriterion = {
        title: "test title",
        description: "test description",
        responseCode: "201"
    }

    const key = await createAcceptanceCriterion(data, 'MCA-434')

    expect(key)
        .toContain('MCA-')
})
