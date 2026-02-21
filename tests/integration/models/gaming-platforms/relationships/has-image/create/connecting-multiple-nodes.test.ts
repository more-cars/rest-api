import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {GamingPlatform} from "../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A GAMING PLATFORM can have multiple ›has-image‹ relationships', async () => {
    const gamingPlatform = await seedNode(ControllerNodeType.GamingPlatform)
    const imagesAmount = 3
    const images = await seedNodes(ControllerNodeType.Image, imagesAmount)

    for (const image of images) {
        await GamingPlatform.createHasImageRelationship(gamingPlatform.properties.id, image.properties.id)
    }

    const relationships = await getRelationshipCollection(
        gamingPlatform.properties.id,
        RelationshipType.GamingPlatformHasImage,
        DbNodeType.Image,
    )

    expect(relationships.length)
        .toBe(imagesAmount)
})
