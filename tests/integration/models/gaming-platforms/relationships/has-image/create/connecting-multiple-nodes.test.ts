import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {GamingPlatform} from "../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

test('A GAMING PLATFORM can have multiple ›has-image‹ relationships', async () => {
    const gamingPlatform = await seedNode(DbNodeType.GamingPlatform)
    const imagesAmount = 3
    const images = await seedNodes(DbNodeType.Image, imagesAmount)

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
