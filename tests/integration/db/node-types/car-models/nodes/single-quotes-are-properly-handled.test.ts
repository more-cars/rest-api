import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/node-types/car-models/createNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        name: "Penny's",
        built_from: null,
        built_to: null,
        generation: null,
        internal_code: "'E99'''A'",
        total_production: null,
    }
    const createdNode = await createNode(data)

    expect(createdNode.properties.name)
        .toEqual("Penny's")

    expect(createdNode.properties.internal_code)
        .toEqual("'E99'''A'")
})
