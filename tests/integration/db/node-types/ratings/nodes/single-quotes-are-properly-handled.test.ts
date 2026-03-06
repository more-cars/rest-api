import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/node-types/ratings/createNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        rating_value: 93,
        scale_minimum: 0,
        scale_maximum: 100,
        scale_direction: "'up''",
    }

    const createdNode = await createNode(data)

    expect(createdNode.properties.scale_direction)
        .toEqual("'up''")
})
