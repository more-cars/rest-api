import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {TrackLayout} from "../../../../../../../src/models/track-layouts/TrackLayout"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

test('A TRACK LAYOUT can have multiple ›has-image‹ relationships', async () => {
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
    const imagesAmount = 3
    const images = await seedNodes(NodeTypeEnum.IMAGE, imagesAmount)

    for (const image of images) {
        await TrackLayout.createHasImageRelationship(trackLayout.id, image.id)
    }

    const relationships = await getRelationshipCollection(
        trackLayout.id,
        DbRelationship.TrackLayoutHasImage,
        NodeTypeLabel.Image,
        RelationshipDirection.FORWARD,
    )

    expect(relationships.length)
        .toBe(imagesAmount)
})
