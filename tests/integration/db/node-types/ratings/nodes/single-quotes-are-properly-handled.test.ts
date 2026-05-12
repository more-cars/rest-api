import {expect, test} from 'vitest'
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import type {RatingNode} from "../../../../../../src/db/node-types/ratings/types/RatingNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        rating_value: 93,
        scale_minimum: 0,
        scale_maximum: 100,
        scale_direction: "'up''",
    }

    const createdNode = await createDbNode(DbNodeType.Rating, data) as RatingNode

    expect(createdNode.properties.scale_direction)
        .toEqual("'up''")
})
