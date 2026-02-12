import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../src/db/nodes/gaming-platforms/getNodeById"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {GamingPlatformSchema} from "../../../../_toolbox/schemas/GamingPlatformSchema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying a GAMING PLATFORM that does not exist should return "false"', async () => {
    const expectedGamingPlatformNode = false
    const actualGamingPlatformNode = await getNodeById(-42)

    expect(actualGamingPlatformNode)
        .toBe(expectedGamingPlatformNode)
})

test('Querying an existing GAMING PLATFORM should return a db node with correct schema', async () => {
    const createdNode = await seedNode(NodeTypeEnum.GAMING_PLATFORM)
    const gamingPlatformNode = await getNodeById(createdNode.id)

    expect(validateJson(gamingPlatformNode, GamingPlatformSchema))
        .toBeTruthy()
})
