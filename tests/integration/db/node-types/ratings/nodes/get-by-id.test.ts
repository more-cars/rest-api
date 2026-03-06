import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../../src/db/node-types/ratings/getNodeById"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {RatingSchema} from "../../../../../_toolbox/schemas/db/RatingSchema"
import {validateJson} from "../../../../../_toolbox/validateJson"

test('Querying a RATING that does not exist should return "false"', async () => {
    const expectedRatingNode = false
    const actualRatingNode = await getNodeById(-42)

    expect(actualRatingNode)
        .toBe(expectedRatingNode)
})

test('Querying an existing RATING should return a db node with correct schema', async () => {
    const createdNode = await seedNode(DbNodeType.Rating)
    const ratingNode = await getNodeById(createdNode.properties.id)

    expect(validateJson(ratingNode, RatingSchema))
        .toBeTruthy()
})
