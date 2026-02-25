import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {RacingSession} from "../../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A RACING SESSION cannot have multiple ›has-prime-image‹ relationships', async () => {
    const racingSession = await seedNode(DbNodeType.RacingSession)
    const imagesAmount = 3
    const images = await seedNodes(DbNodeType.Image, imagesAmount)

    for (const image of images) {
        await RacingSession.createHasPrimeImageRelationship(racingSession.properties.id, image.properties.id)
    }

    const relationships = await getRelationshipCollection(
        racingSession.properties.id,
        RelationshipType.RacingSessionHasPrimeImage,
        DbNodeType.Image,
    )

    expect(relationships.length)
        .toBe(1)
})
