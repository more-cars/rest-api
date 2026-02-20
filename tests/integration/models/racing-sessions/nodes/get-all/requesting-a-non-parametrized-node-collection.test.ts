import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {RacingSessionNode} from "../../../../../../src/models/node-types/racing-sessions/types/RacingSessionNode"
import {RacingSession} from "../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('A non-parametrized "get all RACING SESSION nodes" request returns the correct number of nodes', () => {
    test('when there exist no RACING SESSION nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.RACING_SESSION)

        const expectedNodes: RacingSessionNode[] = []
        const actualNodes = await RacingSession.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist RACING SESSION nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.RACING_SESSION)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(ControllerNodeType.RACING_SESSION, amount)

        const actualNodes = await RacingSession.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
