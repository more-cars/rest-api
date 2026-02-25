import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {LapTimeNode} from "../../../../../../../src/models/node-types/lap-times/types/LapTimeNode"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('A paginated "get all LAP TIME nodes" request returns the correct number of nodes', () => {
    test('when there exist no LAP TIME nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.LapTime)

        const expectedNodes: LapTimeNode[] = []
        const actualNodes = await LapTime.findAll({page: 1})

        expect(expectedNodes)
            .toEqual(actualNodes)
    })

    test('when there exist LAP TIME nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.LapTime)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(DbNodeType.LapTime, amount)

        const actualNodes = await LapTime.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
