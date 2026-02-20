import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/nodes/track-layouts/createNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        name: "'GP Circuit''",
        year_from: 1967,
        year_to: 1999,
        length: 7.004,
        length_unit: "'km''",
        direction: "'clockwise''",
        elevation_change: 71,
        elevation_change_unit: "'m''",
        surface: "'asphalt''",
    }

    const createdNode = await createNode(data)

    expect(createdNode.properties.name)
        .toEqual("'GP Circuit''")

    expect(createdNode.properties.length_unit)
        .toEqual("'km''")

    expect(createdNode.properties.direction)
        .toEqual("'clockwise''")

    expect(createdNode.properties.elevation_change_unit)
        .toEqual("'m''")

    expect(createdNode.properties.surface)
        .toEqual("'asphalt''")
})
