import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/node-types/brands/createNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        name: "HCB'",
        full_name: "Heureka's Car Brand",
        founded: null,
        defunct: null,
        wmi: "ABC'D''EF",
        hsn: "1'''2",
    }

    const createdNode = await createNode(data)

    expect(createdNode.properties.name)
        .toEqual("HCB'")

    expect(createdNode.properties.full_name)
        .toEqual("Heureka's Car Brand")

    expect(createdNode.properties.wmi)
        .toEqual("ABC'D''EF")

    expect(createdNode.properties.hsn)
        .toEqual("1'''2")
})
