import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {RatingNode} from "../../../../../../../src/db/node-types/ratings/types/RatingNode"
import {Rating} from "../../../../../../../src/models/node-types/ratings/Rating"
import {FilterOperator} from "../../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all RATING nodes" request returns only the matching nodes', () => {
    test('when there exist no RATING nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Rating)

        const expectedNodes: RatingNode[] = []
        const actualNodes = await Rating.findAll({
            filterByProperty: 'rating_value',
            filterValue: 77,
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist RATING nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Rating)
        const nodeA = await seedNode(DbNodeType.Rating, {rating_value: 77}) as RatingNode
        await seedNode(DbNodeType.Rating, {rating_value: 88})
        await seedNode(DbNodeType.Rating, {rating_value: 99})

        const filteredNodes = await Rating.findAll({
            filterByProperty: 'rating_value',
            filterValue: 77,
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.rating_value === nodeA.properties.rating_value)
    })
})
