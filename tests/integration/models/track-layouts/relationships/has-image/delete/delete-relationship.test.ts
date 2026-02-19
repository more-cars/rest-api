import {describe, expect, test} from 'vitest'
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-image‹ relationship', () => {
    test('TRACK LAYOUT node does not exist', async () => {
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

        await expect(TrackLayout.deleteHasImageRelationship(trackLayout.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const image = await seedNode(NodeTypeEnum.IMAGE)

        await expect(TrackLayout.deleteHasImageRelationship(-42, image.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('TRACK LAYOUT node and IMAGE node do not exist', async () => {
        await expect(TrackLayout.deleteHasImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-image‹ relationship', async () => {
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
        const image = await seedNode(NodeTypeEnum.IMAGE)

        await expect(TrackLayout.deleteHasImageRelationship(trackLayout.id, image.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-image‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.TRACK_LAYOUT, NodeTypeEnum.IMAGE, RelationshipType.TrackLayoutHasImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node.id,
            RelationshipType.TrackLayoutHasImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await TrackLayout.deleteHasImageRelationship(seededRelationship.start_node.id, seededRelationship.end_node.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node.id,
            RelationshipType.TrackLayoutHasImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
