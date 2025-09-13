import {expect, test, vi} from "vitest"
import {
    createCreateNodeTickets
} from "../../../../specification/sync-scripts/create-jira-tickets/lib/createCreateNodeTickets"
import {updateEpic} from "../../../../specification/sync-scripts/create-jira-tickets/lib/updateEpic"
import {createStory} from "../../../../specification/sync-scripts/create-jira-tickets/lib/createStory"
import {connectStoryToEpic} from "../../../../specification/sync-scripts/create-jira-tickets/lib/connectStoryToEpic"
import {
    createAcceptanceCriterion
} from "../../../../specification/sync-scripts/create-jira-tickets/lib/createAcceptanceCriterion"
import type {TicketTree} from "../../../../specification/sync-scripts/create-jira-tickets/lib/types/TicketTree"
import {createTest} from "../../../../specification/sync-scripts/create-jira-tickets/lib/createTest"
import {
    connectTestToAcceptanceCriterion
} from "../../../../specification/sync-scripts/create-jira-tickets/lib/connectTestToAcceptanceCriterion"

test('Expecting the whole stack of required tickets to be created - mocked', async () => {
    await createCreateNodeTickets(getDummyTicketTree())

    expect(updateEpic)
        .toBeCalledTimes(1)

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
            }],
            stories: [{
                title: 'Test Story 1',
                userStory: 'dummy',
                specificationList: [
                    "spec 1",
                    "spec 2",
                    "spec 3",
                ],
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

vi.mock("../../../../specification/sync-scripts/lib/updateEpic.ts", async () => {
    return {
        updateEpic: vi.fn(() => true)
    }
})

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
