import {expect, test} from "vitest"
import {createAcceptanceCriterion} from "../../../specification/sync-scripts/lib/createAcceptanceCriterion"

test.skip('Creating a new "AC" ticket in Jira - real request', async () => {
    const data = {
        title: "test title",
        description: "test description",
    }

    const key = await createAcceptanceCriterion(data, 'MCA-434')

    expect(key)
        .toContain('MCA-')
})
