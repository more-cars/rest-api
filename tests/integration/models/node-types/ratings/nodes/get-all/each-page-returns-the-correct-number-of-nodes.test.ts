import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {RatingNode} from "../../../../../../../src/models/node-types/ratings/types/RatingNode"
import {Rating} from "../../../../../../../src/models/node-types/ratings/Rating"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"

describe('Each page of a "get all RATING nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist no RATING nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(DbNodeType.Rating)

        const expectedNodes: RatingNode[] = []
        const actualNodes = await Rating.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 RATING nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(DbNodeType.Rating)
        await seedNodes(DbNodeType.Rating, totalNodeAmount)

        const actualNodes = await Rating.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
