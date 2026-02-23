import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/node-types/racing-games/createNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        name: "'Forza Motorsport 7''",
        release_year: 2017,
        developer: "'Turn 10 Studios''",
        publisher: "'Microsoft Studios''",
    }

    const createdNode = await createNode(data)

    expect(createdNode.properties.name)
        .toEqual("'Forza Motorsport 7''")

    expect(createdNode.properties.developer)
        .toEqual("'Turn 10 Studios''")

    expect(createdNode.properties.publisher)
        .toEqual("'Microsoft Studios''")
})
