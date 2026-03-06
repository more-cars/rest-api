import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {RatingNode} from "../../../../../../../src/models/node-types/ratings/types/RatingNode"
import {Rating} from "../../../../../../../src/models/node-types/ratings/Rating"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"

describe('A paginated "get all RATING nodes" request returns the correct number of nodes', () => {
    test('when there exist no RATING nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Rating)

        const expectedNodes: RatingNode[] = []
        const actualNodes = await Rating.findAll({page: 1})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist RATING nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Rating)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(DbNodeType.Rating, amount)

        const actualNodes = await Rating.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
