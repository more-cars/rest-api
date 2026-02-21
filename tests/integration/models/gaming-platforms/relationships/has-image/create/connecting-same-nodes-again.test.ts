import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {GamingPlatform} from "../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-image‹ relationship again', async () => {
    const gamingPlatform = await seedNode(ControllerNodeType.GamingPlatform)
    const image = await seedNode(ControllerNodeType.Image)

    await expect(GamingPlatform.createHasImageRelationship(gamingPlatform.properties.id, image.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(GamingPlatform.createHasImageRelationship(gamingPlatform.properties.id, image.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
