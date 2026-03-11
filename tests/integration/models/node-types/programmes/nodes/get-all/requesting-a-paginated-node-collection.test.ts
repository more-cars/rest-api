import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {ProgrammeNode} from "../../../../../../../src/models/node-types/programmes/types/ProgrammeNode"
import {Programme} from "../../../../../../../src/models/node-types/programmes/Programme"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"

describe('A paginated "get all PROGRAMME nodes" request returns the correct number of nodes', () => {
    test('when there exist no PROGRAMME nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Programme)

        const expectedNodes: ProgrammeNode[] = []
        const actualNodes = await Programme.findAll({page: 1})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist PROGRAMME nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Programme)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(DbNodeType.Programme, amount)

        const actualNodes = await Programme.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
