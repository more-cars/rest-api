import {expect, test, vi} from "vitest"
import {createNode} from "../../../../specification/sync-scripts/create-jira-tickets/createNode"
import {createStory} from "../../../../specification/sync-scripts/lib/createStory"
import {createAcceptanceCriterion} from "../../../../specification/sync-scripts/lib/createAcceptanceCriterion"
import type {TicketTree} from "../../../../specification/sync-scripts/lib/types/TicketTree"
import {createTest} from "../../../../specification/sync-scripts/lib/createTest"
import {
    connectTestToAcceptanceCriterion
} from "../../../../specification/sync-scripts/lib/connectTestToAcceptanceCriterion"
import {connectStoryToEpic} from "../../../../specification/sync-scripts/lib/connectStoryToEpic"

test('Expecting the whole stack of required tickets to be created - mocked', async () => {
    await createNode(getDummyTicketTree())

    expect(createStory)
        .toBeCalledTimes(1)

    expect(connectStoryToEpic)
        .toBeCalledTimes(1)

    expect(createAcceptanceCriterion)
        .toBeCalledTimes(3)

    expect(createTest)
        .toBeCalledTimes(4)

    expect(connectTestToAcceptanceCriterion)
        .toBeCalledTimes(4)
})

function getDummyTicketTree(): TicketTree {
    return {
        epic: {
            jiraId: 'TEST-1',
            stories: [{
                title: 'Test Story 1',
                userStory: 'dummy',
                description: 'dummy',
                apiVerb: 'dummy',
                apiPath: 'dummy',
                responseOptions: [],
                acceptanceCriteria: [{
                    title: 'Test AC 1.1',
                    description: 'dummy',
                    responseCode: '',
                    tests: [{
                        title: 'Test Test 1.1.1',
                        gherkin: 'dummy',
                    }],
                }, {
                    title: 'Test AC 1.2',
                    description: '',
                    responseCode: '',
                    tests: [{
                        title: 'Test Test 1.2.1',
                        gherkin: 'dummy',
                    }, {
                        title: 'Test Test 1.2.1',
                        gherkin: 'dummy',
                    }],
                }, {
                    title: 'Test AC 1.3',
                    description: '',
                    responseCode: '',
                    tests: [{
                        title: 'Test Test 1.3.1',
                        gherkin: 'dummy',
                    }],
                }]
            }]
        }
    }
}

vi.mock("../../../../specification/sync-scripts/lib/createStory.ts", async () => {
    return {
        createStory: vi.fn(() => 'TEST-2')
    }
})

vi.mock("../../../../specification/sync-scripts/lib/connectStoryToEpic.ts", async () => {
    return {
        connectStoryToEpic: vi.fn(() => 'TEST-R-12')
    }
})

vi.mock("../../../../specification/sync-scripts/lib/createAcceptanceCriterion.ts", async () => {
    return {
        createAcceptanceCriterion: vi.fn(() => 'TEST-3')
    }
})

vi.mock("../../../../specification/sync-scripts/lib/createTest.ts", async () => {
    return {
        createTest: vi.fn(() => 'TEST-4')
    }
})

vi.mock("../../../../specification/sync-scripts/lib/connectTestToAcceptanceCriterion.ts", async () => {
    return {
        connectTestToAcceptanceCriterion: vi.fn(() => 'TEST-R-34')
    }
})
