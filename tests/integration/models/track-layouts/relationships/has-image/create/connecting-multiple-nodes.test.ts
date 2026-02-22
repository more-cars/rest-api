import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

test('A TRACK LAYOUT can have multiple ›has-image‹ relationships', async () => {
    const trackLayout = await seedNode(DbNodeType.TrackLayout)
    const imagesAmount = 3
    const images = await seedNodes(DbNodeType.Image, imagesAmount)

    for (const image of images) {
        await TrackLayout.createHasImageRelationship(trackLayout.properties.id, image.properties.id)
    }

    const relationships = await getRelationshipCollection(
        trackLayout.properties.id,
        RelationshipType.TrackLayoutHasImage,
        DbNodeType.Image,
    )

    expect(relationships.length)
        .toBe(imagesAmount)
})
