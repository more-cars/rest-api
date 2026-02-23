import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/node-types/racing-events/createNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        name: "'GP Monaco 2025''",
        round: 8,
        date_from: "'2025-05-25''",
        date_to: "'2025-05-27''",
    }

    const createdNode = await createNode(data)

    expect(createdNode.properties.name)
        .toEqual("'GP Monaco 2025''")

    expect(createdNode.properties.date_from)
        .toEqual("'2025-05-25''")

    expect(createdNode.properties.date_to)
        .toEqual("'2025-05-27''")
})
