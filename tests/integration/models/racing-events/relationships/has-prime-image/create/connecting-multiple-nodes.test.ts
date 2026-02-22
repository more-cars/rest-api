import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

test('A RACING EVENT cannot have multiple ›has-prime-image‹ relationships', async () => {
    const racingEvent = await seedNode(DbNodeType.RacingEvent)
    const imagesAmount = 3
    const images = await seedNodes(DbNodeType.Image, imagesAmount)

    for (const image of images) {
        await RacingEvent.createHasPrimeImageRelationship(racingEvent.properties.id, image.properties.id)
    }

    const relationships = await getRelationshipCollection(
        racingEvent.properties.id,
        RelationshipType.RacingEventHasPrimeImage,
        DbNodeType.Image,
    )

    expect(relationships.length)
        .toBe(1)
})
