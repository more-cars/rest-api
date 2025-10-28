import {expect, test} from 'vitest'
import {deleteAllSessionResults} from "../../../../_toolbox/dbSeeding/session-results/nodes/deleteAllSessionResults"
import {SessionResultNode} from "../../../../../src/db/nodes/session-results/types/SessionResultNode"
import {seedSessionResults} from "../../../../_toolbox/dbSeeding/session-results/nodes/seedSessionResults"
import {getAllNodesOfType} from "../../../../../src/db/nodes/session-results/getAllNodesOfType"

test('When there are no SESSION RESULTS then an empty array should be returned', async () => {
    await deleteAllSessionResults()

    const expectedSessionResults: Array<SessionResultNode> = []
    const actualSessionResults = await getAllNodesOfType()

    expect(actualSessionResults)
        .toEqual(expectedSessionResults)
})

test('When SESSION RESULTS exist then all of them should be returned', async () => {
    await deleteAllSessionResults()
    const amount = Math.ceil(Math.random() * 50)
    await seedSessionResults(amount)

    const actualSessionResults = await getAllNodesOfType()

    expect(actualSessionResults.length)
        .toEqual(amount)
})
