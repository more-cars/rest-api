import {expect, test} from "vitest"
import {
    transitionStoryBackIntoTodo,
    transitionStoryIntoReadyForImplementation
} from "../../../ticket-generator/lib/transitionStoryIntoReadyForImplementation"

test('Transitioning "Story" into status "ready for implementation" in Jira - real request - success', async () => {
    let response = await transitionStoryIntoReadyForImplementation('MCA-744')
    expect(response)
        .toEqual(true)

    response = await transitionStoryBackIntoTodo('MCA-744')
    expect(response)
        .toEqual(true)
})
