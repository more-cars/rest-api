import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {GamingPlatform} from "../../../../../../../src/models/gaming-platforms/GamingPlatform"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-prime-image‹ relationship with valid data', async () => {
    const gamingPlatform = await seedNode(NodeTypeEnum.GAMING_PLATFORM)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    const createdRelationship = await GamingPlatform.createHasPrimeImageRelationship(gamingPlatform.id, image.id)

    expect(createdRelationship.origin.id)
        .toEqual(gamingPlatform.id)
    expect(createdRelationship.destination.id)
        .toEqual(image.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.GamingPlatformHasPrimeImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
