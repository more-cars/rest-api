import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {GamingPlatform} from "../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {Neo4jNodeType} from "../../../../../../../src/db/types/Neo4jNodeType"

test('A GAMING PLATFORM cannot have multiple ›has-prime-image‹ relationships', async () => {
    const gamingPlatform = await seedNode(ControllerNodeType.GAMING_PLATFORM)
    const imagesAmount = 3
    const images = await seedNodes(ControllerNodeType.IMAGE, imagesAmount)

    for (const image of images) {
        await GamingPlatform.createHasPrimeImageRelationship(gamingPlatform.id, image.id)
    }

    const relationships = await getRelationshipCollection(
        gamingPlatform.id,
        RelationshipType.GamingPlatformHasPrimeImage,
        Neo4jNodeType.Image,
    )

    expect(relationships.length)
        .toBe(1)
})
