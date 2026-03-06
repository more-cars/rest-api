import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {RatingNode} from "../../../../../../../src/db/node-types/ratings/types/RatingNode"
import {Rating} from "../../../../../../../src/models/node-types/ratings/Rating"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all RATING nodes" request returns the nodes in correct order', () => {
    test('when there exist no RATING nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Rating)

        const expectedNodes: RatingNode[] = []
        const actualNodes = await Rating.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist RATING nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Rating)
        const nodeA = await seedNode(DbNodeType.Rating, {rating_value: 77}) as RatingNode
        const nodeB = await seedNode(DbNodeType.Rating, {rating_value: 88}) as RatingNode
        const nodeC = await seedNode(DbNodeType.Rating, {rating_value: 99}) as RatingNode

        const ascNodes = await Rating.findAll({sortByProperty: 'rating_value', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.rating_value === nodeA.properties.rating_value)
        expect(ascNodes[1].attributes.rating_value === nodeB.properties.rating_value)
        expect(ascNodes[2].attributes.rating_value === nodeC.properties.rating_value)

        const descNodes = await Rating.findAll({sortByProperty: 'rating_value', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.rating_value === nodeC.properties.rating_value)
        expect(descNodes[1].attributes.rating_value === nodeB.properties.rating_value)
        expect(descNodes[2].attributes.rating_value === nodeA.properties.rating_value)
    })
})
