import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import {SessionResultNode} from "../../../../../src/db/nodes/session-results/types/SessionResultNode"
import {seedNodes} from "../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../src/db/nodes/session-results/getAllNodesOfType"

test('When there are no SESSION RESULTS then an empty array should be returned', async () => {
    await deleteAllNodesOfType(ControllerNodeType.SESSION_RESULT)

    const expectedSessionResults: SessionResultNode[] = []
    const actualSessionResults = await getAllNodesOfType()

    expect(actualSessionResults)
        .toEqual(expectedSessionResults)
})

test('When SESSION RESULTS exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(ControllerNodeType.SESSION_RESULT)
    const amount = Math.ceil(Math.random() * 50)
    await seedNodes(ControllerNodeType.SESSION_RESULT, amount)

    const actualSessionResults = await getAllNodesOfType()

    expect(actualSessionResults.length)
        .toEqual(amount)
})
