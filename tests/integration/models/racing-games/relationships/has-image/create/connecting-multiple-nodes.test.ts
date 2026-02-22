import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

test('A RACING GAME can have multiple ›has-image‹ relationships', async () => {
    const racingGame = await seedNode(DbNodeType.RacingGame)
    const imagesAmount = 3
    const images = await seedNodes(DbNodeType.Image, imagesAmount)

    for (const image of images) {
        await RacingGame.createHasImageRelationship(racingGame.properties.id, image.properties.id)
    }

    const relationships = await getRelationshipCollection(
        racingGame.properties.id,
        RelationshipType.RacingGameHasImage,
        DbNodeType.Image,
    )

    expect(relationships.length)
        .toBe(imagesAmount)
})
