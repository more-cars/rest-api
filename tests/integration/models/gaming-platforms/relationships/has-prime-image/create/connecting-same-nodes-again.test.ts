import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {GamingPlatform} from "../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-prime-image‹ relationship again', async () => {
    const gamingPlatform = await seedNode(ControllerNodeType.GAMING_PLATFORM)
    const image = await seedNode(ControllerNodeType.IMAGE)

    await expect(GamingPlatform.createHasPrimeImageRelationship(gamingPlatform.properties.id, image.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(GamingPlatform.createHasPrimeImageRelationship(gamingPlatform.properties.id, image.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
