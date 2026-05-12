import {expect, test} from 'vitest'
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import type {GamingPlatformNode} from "../../../../../../src/db/node-types/gaming-platforms/types/GamingPlatformNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        name: "'PlayStation 5''",
        release_year: 2020,
        manufacturer: "'Sony''",
    }

    const createdNode = await createDbNode(DbNodeType.GamingPlatform, data) as GamingPlatformNode

    expect(createdNode.properties.name)
        .toEqual("'PlayStation 5''")

    expect(createdNode.properties.manufacturer)
        .toEqual("'Sony''")
})
