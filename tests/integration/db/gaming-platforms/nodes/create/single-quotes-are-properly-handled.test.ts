import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/node-types/gaming-platforms/createNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        name: "'PlayStation 5''",
        release_year: 2020,
        manufacturer: "'Sony''",
    }

    const createdNode = await createNode(data)

    expect(createdNode.properties.name)
        .toEqual("'PlayStation 5''")

    expect(createdNode.properties.manufacturer)
        .toEqual("'Sony''")
})
