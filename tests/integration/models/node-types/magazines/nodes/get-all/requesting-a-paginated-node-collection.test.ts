import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {MagazineNode} from "../../../../../../../src/models/node-types/magazines/types/MagazineNode"
import {Magazine} from "../../../../../../../src/models/node-types/magazines/Magazine"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"

describe('A paginated "get all MAGAZINE nodes" request returns the correct number of nodes', () => {
    test('when there exist no MAGAZINE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Magazine)

        const expectedNodes: MagazineNode[] = []
        const actualNodes = await Magazine.findAll({page: 1})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist MAGAZINE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Magazine)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(DbNodeType.Magazine, amount)

        const actualNodes = await Magazine.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
