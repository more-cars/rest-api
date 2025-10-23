import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/nodes/racing-series/createNode"

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

    expect(createdNode.name)
        .toEqual("'Formula 1''")

    expect(createdNode.short_name)
        .toEqual("'F1''")

    expect(createdNode.organized_by)
        .toEqual("'FIA''")

    expect(createdNode.vehicle_type)
        .toEqual("'formula racing cars''")
})
