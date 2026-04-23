import {expect, test} from 'vitest'
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import type {MagazineNode} from "../../../../../../src/db/node-types/magazines/types/MagazineNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        name: "'Top Gear''",
        founded: 1993,
        defunct: null,
        focus: "'sports cars''",
        publication_frequency: "'monthly''",
        single_copy_price: 5.99,
        single_copy_price_unit: "'£''",
        publication_format: "'print''",
        circulation: 150884,
        circulation_year: 2013,
        publisher: "'Immediate Media Company''",
        issn: "'1350-9624''",
        country_code: "'GB''",
    }

    const createdNode = await createNeo4jNode(DbNodeType.Magazine, data) as MagazineNode

    expect(createdNode.properties.name)
        .toEqual("'Top Gear''")

    expect(createdNode.properties.focus)
        .toEqual("'sports cars''")

    expect(createdNode.properties.publication_frequency)
        .toEqual("'monthly''")

    expect(createdNode.properties.single_copy_price_unit)
        .toEqual("'£''")

    expect(createdNode.properties.publication_format)
        .toEqual("'print''")

    expect(createdNode.properties.publisher)
        .toEqual("'Immediate Media Company''")

    expect(createdNode.properties.issn)
        .toEqual("'1350-9624''")

    expect(createdNode.properties.country_code)
        .toEqual("'GB''")
})
