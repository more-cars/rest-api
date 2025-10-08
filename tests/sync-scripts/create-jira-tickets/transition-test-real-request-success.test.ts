import {expect, test} from "vitest"
import {
    transitionTestBackIntoTodo,
    transitionTestIntoReadyForImplementation
} from "../../../ticket-generator/lib/transitionTestIntoReadyForImplementation"

test('Transitioning "Test" into status "ready for implementation" in Jira - real request - success', async () => {
    let response = await transitionTestIntoReadyForImplementation('MCA-746')
    expect(response)
        .toEqual(true)

    response = await transitionTestBackIntoTodo('MCA-746')
    expect(response)
        .toEqual(true)
})
