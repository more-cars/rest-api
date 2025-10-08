import {expect, test} from "vitest"
import {
    transitionAcceptanceCriterionBackIntoTodo,
    transitionAcceptanceCriterionIntoReadyForImplementation
} from "../../../ticket-generator/lib/transitionAcceptanceCriterionIntoReadyForImplementation"

test('Transitioning "Acceptance Criterion" into status "ready for implementation" in Jira - real request - success', async () => {
    let response = await transitionAcceptanceCriterionIntoReadyForImplementation('MCA-745')
    expect(response)
        .toEqual(true)

    response = await transitionAcceptanceCriterionBackIntoTodo('MCA-745')
    expect(response)
        .toEqual(true)
})
