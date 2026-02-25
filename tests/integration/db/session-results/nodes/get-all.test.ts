import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {SessionResultNode} from "../../../../../src/db/node-types/session-results/types/SessionResultNode"
import {seedNodes} from "../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../src/db/node-types/session-results/getAllNodesOfType"

test('When there are no SESSION RESULTS then an empty array should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.SessionResult)

    const expectedSessionResults: SessionResultNode[] = []
    const actualSessionResults = await getAllNodesOfType()

    expect(actualSessionResults)
        .toEqual(expectedSessionResults)
})

test('When SESSION RESULTS exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.SessionResult)
    const amount = Math.ceil(Math.random() * 20)
    await seedNodes(DbNodeType.SessionResult, amount)

    const actualSessionResults = await getAllNodesOfType()

    expect(actualSessionResults.length)
        .toEqual(amount)
})
