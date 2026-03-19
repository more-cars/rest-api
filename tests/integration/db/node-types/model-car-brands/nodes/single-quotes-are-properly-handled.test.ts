import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/node-types/model-car-brands/createNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        name: "'Hot Wheels''",
        founded: 1968,
        defunct: null,
    }

    const createdNode = await createNode(data)

    expect(createdNode.properties.name)
        .toEqual("'Hot Wheels''")
})
