import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {LapTimeNode} from "../../../../../../src/models/node-types/lap-times/types/LapTimeNode"
import {LapTime} from "../../../../../../src/models/node-types/lap-times/LapTime"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('A non-parametrized "get all LAP TIME nodes" request returns the correct number of nodes', () => {
    test('when there exist no LAP TIME nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.LAP_TIME)

        const expectedNodes: LapTimeNode[] = []
        const actualNodes = await LapTime.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist LAP TIME nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.LAP_TIME)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(ControllerNodeType.LAP_TIME, amount)

        const actualNodes = await LapTime.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
