import {expect, test} from "vitest"
import {createTest} from "../../../specification/sync-scripts/lib/createTest"
import type {Test} from "../../../specification/sync-scripts/lib/types/Test"

test.skip('Creating a new "test" ticket in Jira - real request', async () => {
    const data: Test = {
        title: "test title",
        description: "test description",
    }

    const key = await createTest(data)

    expect(key)
        .toContain('MCA-')
})
