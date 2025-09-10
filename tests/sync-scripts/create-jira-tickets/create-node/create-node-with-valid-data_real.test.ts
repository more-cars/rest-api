import {expect, test} from "vitest"
import {createNode} from "../../../../specification/sync-scripts/create-jira-tickets/createNode"
import type {TicketTree} from "../../../../specification/sync-scripts/lib/types/TicketTree"

test('Expecting the whole stack of required tickets to be created - real requests', async () => {
    const ids = await createNode(getPopulatedTicketTree())
    console.log(ids)

    expect(ids.stories.length)
        .toEqual(1)

    expect(ids.acceptanceCriteria.length)
        .toEqual(1)

    expect(ids.tests.length)
        .toEqual(1)
}, 60000)

function getPopulatedTicketTree(): TicketTree {
    return {
        epic: {
            jiraId: 'MCA-498',
            dataStructure: [{
                name: "test_prop_1",
                mandatory: true,
                datatype: "string",
                example: "test",
            }, {
                name: "test_prop_2",
                mandatory: false,
                datatype: "number",
                example: "test",
            }, {
                name: "test_prop_3",
                mandatory: false,
                datatype: "boolean",
                example: "test",
            }],
            stories: [{
                title: 'Test Story 1',
                userStory: `As a... 
I want to... 
So I can...`,
                description: 'test',
                apiVerb: 'POST',
                apiPath: '/test/<id>',
                responseOptions: [
                    '201',
                    '404',
                ],
                acceptanceCriteria: [
                    {
                        title: 'Test AC 1.1',
                        description: 'test',
                        responseCode: '201',
                        tests: [
                            {
                                title: 'Test Test 1.1.1',
                                gherkin: "Given there exists\nWhen the user ...\nThen it should ..."
                            },
                        ],
                    },
                ],
            }],
        }
    }
}
