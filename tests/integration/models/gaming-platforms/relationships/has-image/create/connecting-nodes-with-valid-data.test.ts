import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {GamingPlatform} from "../../../../../../../src/models/gaming-platforms/GamingPlatform"
import {GamingPlatformRelationship} from "../../../../../../../src/models/gaming-platforms/types/GamingPlatformRelationship"

test('Creating a ›has-image‹ relationship with valid data', async () => {
    const gamingPlatform = await seedNode(NodeTypeEnum.GAMING_PLATFORM)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    const createdRelationship = await GamingPlatform.createHasImageRelationship(gamingPlatform.id, image.id)

    expect(createdRelationship.origin.id)
        .toEqual(gamingPlatform.id)
    expect(createdRelationship.destination.id)
        .toEqual(image.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(GamingPlatformRelationship.hasImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
