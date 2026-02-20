import {expect, test} from 'vitest'
import {GamingPlatform} from "../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"

test('Fetching a GAMING PLATFORM that does not exist should return "false"', async () => {
    const expectedGamingPlatform = false
    const actualGamingPlatform = await GamingPlatform.findById(-42)

    expect(actualGamingPlatform)
        .toEqual(expectedGamingPlatform)
})

test('When the GAMING PLATFORM exists it should be returned', async () => {
    const expectedGamingPlatform = await seedNode(ControllerNodeType.GAMING_PLATFORM)
    const actualGamingPlatform = await GamingPlatform.findById(expectedGamingPlatform.id)

    expect(actualGamingPlatform)
        .toEqual(expectedGamingPlatform)
})
