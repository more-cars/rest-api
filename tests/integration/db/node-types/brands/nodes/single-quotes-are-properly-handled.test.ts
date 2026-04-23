import {expect, test} from 'vitest'
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import type {BrandNode} from "../../../../../../src/db/node-types/brands/types/BrandNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        name: "HCB'",
        full_name: "Heureka's Car Brand",
        founded: null,
        defunct: null,
        wmi: "ABC'D''EF",
        hsn: "1'''2",
        country_code: "1'''2",
    }

    const createdNode = await createNeo4jNode(DbNodeType.Brand, data) as BrandNode

    expect(createdNode.properties.name)
        .toEqual("HCB'")

    expect(createdNode.properties.full_name)
        .toEqual("Heureka's Car Brand")

    expect(createdNode.properties.wmi)
        .toEqual("ABC'D''EF")

    expect(createdNode.properties.hsn)
        .toEqual("1'''2")

    expect(createdNode.properties.country_code)
        .toEqual("1'''2")
})
