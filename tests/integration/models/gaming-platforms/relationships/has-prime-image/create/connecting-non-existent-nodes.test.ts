import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {GamingPlatform} from "../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-prime-image‹ relationship with nodes that do not exist', async () => {
    const gamingPlatform = await seedNode(NodeTypeEnum.GAMING_PLATFORM)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(GamingPlatform.createHasPrimeImageRelationship(-42, image.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(GamingPlatform.createHasPrimeImageRelationship(gamingPlatform.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(GamingPlatform.createHasPrimeImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
