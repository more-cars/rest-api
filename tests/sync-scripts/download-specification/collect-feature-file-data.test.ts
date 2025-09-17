import {expect, test} from "vitest"
import {
    collectFeatureFileData
} from "../../../specification/sync-scripts/download-specification/lib/collectFeatureFileData"
import type {Story} from "../../../specification/sync-scripts/download-specification/lib/types/Story"
import type {
    AcceptanceCriterion
} from "../../../specification/sync-scripts/download-specification/lib/types/AcceptanceCriterion"
import type {Test} from "../../../specification/sync-scripts/download-specification/lib/types/Test"

test('Collecting all information necessary to create a Gherkin feature file', async () => {
    const story: Story = {
        id: "DUMMY-1",
        parent_id: "",
        title: "Story 001",
        user_story: "As a...\nI want to...\nSo I can...",
        api_verb: null,
        api_path: null,
        response_options: [],
        description: "",
        release_versions: [],
        created_at: "dummy",
        updated_at: "dummy"
    }
    const ac: AcceptanceCriterion = {
        id: "DUMMY-2",
        parent_id: "DUMMY-1",
        title: "AC 002",
        description: "",
        release_version: null,
        created_at: "dummy",
        updated_at: "dummy"
    }
    const test: Test = {
        id: "DUMMY-3",
        parent_id: "DUMMY-2",
        title: "Test 003",
        gherkin: "Given...\nWhen...\nThen",
        labels: [
            "implemented"
        ],
        created_at: "dummy",
        updated_at: "dummy"
    }

    const collectedData = collectFeatureFileData(test, ac, story)

    expect(collectedData)
        .toStrictEqual({
            feature: {
                id: "DUMMY-1",
                title: "Story 001",
                user_story: "As a...\nI want to...\nSo I can...",
            },
            rule: {
                id: "DUMMY-2",
                title: "AC 002",
            },
            scenario: {
                id: "DUMMY-3",
                title: "Test 003",
                type: 'scenario',
                gherkin: "Given...\nWhen...\nThen",
                tags: [
                    "implemented"
                ]
            }
        })
})
