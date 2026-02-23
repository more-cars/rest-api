import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/node-types/racing-series/createNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        name: "'Formula 1''",
        short_name: "'F1''",
        founded: 1950,
        defunct: null,
        organized_by: "'FIA''",
        vehicle_type: "'formula racing cars''",
    }

    const createdNode = await createNode(data)

    expect(createdNode.properties.name)
        .toEqual("'Formula 1''")

    expect(createdNode.properties.short_name)
        .toEqual("'F1''")

    expect(createdNode.properties.organized_by)
        .toEqual("'FIA''")

    expect(createdNode.properties.vehicle_type)
        .toEqual("'formula racing cars''")
})
