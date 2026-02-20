import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A TRACK LAYOUT cannot have multiple ›has-prime-image‹ relationships', async () => {
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)
    const imagesAmount = 3
    const images = await seedNodes(ControllerNodeType.IMAGE, imagesAmount)

    for (const image of images) {
        await TrackLayout.createHasPrimeImageRelationship(trackLayout.id, image.id)
    }

    const relationships = await getRelationshipCollection(
        trackLayout.id,
        RelationshipType.TrackLayoutHasPrimeImage,
        DbNodeType.Image,
    )

    expect(relationships.length)
        .toBe(1)
})
