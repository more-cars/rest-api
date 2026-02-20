import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {GamingPlatform} from "../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-prime-image‹ relationship with valid data', async () => {
    const gamingPlatform = await seedNode(ControllerNodeType.GAMING_PLATFORM)
    const image = await seedNode(ControllerNodeType.IMAGE)

    const createdRelationship = await GamingPlatform.createHasPrimeImageRelationship(gamingPlatform.id, image.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(gamingPlatform.id)
    expect(createdRelationship.destination.properties.id)
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
