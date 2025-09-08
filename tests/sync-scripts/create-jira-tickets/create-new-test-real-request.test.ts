import {expect, test} from "vitest"
import {createTest} from "../../../specification/sync-scripts/lib/createTest"

test.skip('Creating a new "test" ticket in Jira - real request', async () => {
    const data = {
        title: "test title",
        description: "test description",
    }

    const key = await createTest(data)

    expect(key)
        .toContain('MCA-')
})
