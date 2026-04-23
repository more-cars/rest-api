import {expect, test} from 'vitest'
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import type {GamingPlatformNode} from "../../../../../../src/db/node-types/gaming-platforms/types/GamingPlatformNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        name: "'PlayStation 5''",
        release_year: 2020,
        manufacturer: "'Sony''",
    }

    const createdNode = await createNeo4jNode(DbNodeType.GamingPlatform, data) as GamingPlatformNode

    expect(createdNode.properties.name)
        .toEqual("'PlayStation 5''")

    expect(createdNode.properties.manufacturer)
        .toEqual("'Sony''")
})
