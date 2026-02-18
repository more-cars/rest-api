import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {GamingPlatform} from "../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

test('A GAMING PLATFORM can have multiple ›has-image‹ relationships', async () => {
    const gamingPlatform = await seedNode(NodeTypeEnum.GAMING_PLATFORM)
    const imagesAmount = 3
    const images = await seedNodes(NodeTypeEnum.IMAGE, imagesAmount)

    for (const image of images) {
        await GamingPlatform.createHasImageRelationship(gamingPlatform.id, image.id)
    }

    const relationships = await getRelationshipCollection(
        gamingPlatform.id,
        RelationshipType.GamingPlatformHasImage,
        NodeTypeLabel.Image,
    )

    expect(relationships.length)
        .toBe(imagesAmount)
})
