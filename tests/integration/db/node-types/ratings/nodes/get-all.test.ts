import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {RatingNode} from "../../../../../../src/db/node-types/ratings/types/RatingNode"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {fetchNodesFromDb} from "../../../../../../src/db/nodes/fetchNodesFromDb"

test('When there are no RATINGS then an empty array should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.Rating)

    const expectedRatings: RatingNode[] = []
    const actualRatings = await fetchNodesFromDb(DbNodeType.Rating)

    expect(actualRatings)
        .toEqual(expectedRatings)
})

test('When RATINGS exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.Rating)
    const amount = Math.ceil(Math.random() * 20)
    await seedNodes(DbNodeType.Rating, amount)

    const actualRatings = await fetchNodesFromDb(DbNodeType.Rating)

    expect(actualRatings.length)
        .toEqual(amount)
})
