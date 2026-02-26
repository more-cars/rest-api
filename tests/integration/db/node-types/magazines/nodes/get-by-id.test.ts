import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../../src/db/node-types/magazines/getNodeById"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {MagazineSchema} from "../../../../../_toolbox/schemas/db/MagazineSchema"
import {validateJson} from "../../../../../_toolbox/validateJson"

test('Querying a MAGAZINE that does not exist should return "false"', async () => {
    const expectedMagazineNode = false
    const actualMagazineNode = await getNodeById(-42)

    expect(actualMagazineNode)
        .toBe(expectedMagazineNode)
})

test('Querying an existing MAGAZINE should return a db node with correct schema', async () => {
    const createdNode = await seedNode(DbNodeType.Magazine)
    const magazineNode = await getNodeById(createdNode.properties.id)

    expect(validateJson(magazineNode, MagazineSchema))
        .toBeTruthy()
})
