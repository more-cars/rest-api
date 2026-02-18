import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {GamingPlatform} from "../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›has-prime-image‹ relationship again', async () => {
    const gamingPlatform = await seedNode(NodeTypeEnum.GAMING_PLATFORM)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(GamingPlatform.createHasPrimeImageRelationship(gamingPlatform.id, image.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(GamingPlatform.createHasPrimeImageRelationship(gamingPlatform.id, image.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
