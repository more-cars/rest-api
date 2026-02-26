import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {MagazineNode} from "../../../../../../../src/models/node-types/magazines/types/MagazineNode"
import {Magazine} from "../../../../../../../src/models/node-types/magazines/Magazine"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"

describe('Each page of a "get all MAGAZINE nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist no MAGAZINE nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(DbNodeType.Magazine)

        const expectedNodes: MagazineNode[] = []
        const actualNodes = await Magazine.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 MAGAZINE nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(DbNodeType.Magazine)
        await seedNodes(DbNodeType.Magazine, totalNodeAmount)

        const actualNodes = await Magazine.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
