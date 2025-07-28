import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/nodes/brands/createNode"

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

    expect(createdNode.name)
        .toEqual("HCB'")

    expect(createdNode.full_name)
        .toEqual("Heureka's Car Brand")

    expect(createdNode.wmi)
        .toEqual("ABC'D''EF")

    expect(createdNode.hsn)
        .toEqual("1'''2")
})
