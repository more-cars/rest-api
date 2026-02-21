import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../src/db/nodes/gaming-platforms/getNodeById"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import {GamingPlatformSchema} from "../../../../_toolbox/schemas/GamingPlatformSchema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying a GAMING PLATFORM that does not exist should return "false"', async () => {
    const expectedGamingPlatformNode = false
    const actualGamingPlatformNode = await getNodeById(-42)

    expect(actualGamingPlatformNode)
        .toBe(expectedGamingPlatformNode)
})

test('Querying an existing GAMING PLATFORM should return a db node with correct schema', async () => {
    const createdNode = await seedNode(ControllerNodeType.GamingPlatform)
    const gamingPlatformNode = await getNodeById(createdNode.properties.id)

    expect(validateJson(gamingPlatformNode, GamingPlatformSchema))
        .toBeTruthy()
})
