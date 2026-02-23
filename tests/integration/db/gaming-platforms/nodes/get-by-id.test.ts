import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../src/db/node-types/gaming-platforms/getNodeById"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {GamingPlatformSchema} from "../../../../_toolbox/schemas/db/GamingPlatformSchema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying a GAMING PLATFORM that does not exist should return "false"', async () => {
    const expectedGamingPlatformNode = false
    const actualGamingPlatformNode = await getNodeById(-42)

    expect(actualGamingPlatformNode)
        .toBe(expectedGamingPlatformNode)
})

test('Querying an existing GAMING PLATFORM should return a db node with correct schema', async () => {
    const createdNode = await seedNode(DbNodeType.GamingPlatform)
    const gamingPlatformNode = await getNodeById(createdNode.properties.id)

    expect(validateJson(gamingPlatformNode, GamingPlatformSchema))
        .toBeTruthy()
})
