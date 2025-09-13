import {expect, test} from "vitest"
import {createTest} from "../../../specification/sync-scripts/create-jira-tickets/lib/createTest"
import type {Test} from "../../../specification/sync-scripts/create-jira-tickets/lib/types/Test"

test('Creating a new "test" ticket in Jira - real request', async () => {
    const data: Test = {
        title: "test title",
        gherkin: "Given \"test\"...\nWhen...\nThen..."
    }

    const key = await createTest(data)

    expect(key)
        .toContain('MCA-')
})
