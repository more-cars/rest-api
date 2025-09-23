import {expect, test} from "vitest"
import {createTest} from "../../../ticket-generator/lib/createTest"
import type {Test} from "../../../ticket-generator/lib/types/Test"

test('Creating a new "test" ticket in Jira - real request', async () => {
    const data: Test = {
        title: "test title",
        gherkin: "Given \"test\"...\nWhen...\nThen..."
    }

    const key = await createTest(data)

    expect(key)
        .toContain('MCA-')
})
