import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

describe('Trying to delete a ›has-prime-image‹ relationship', () => {
    test('nodes exist and have a relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.TRACK_LAYOUT, NodeTypeEnum.IMAGE, DbRelationship.TrackLayoutHasPrimeImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.TrackLayoutHasPrimeImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await deleteSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.TrackLayoutHasPrimeImage,
        )

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.TrackLayoutHasPrimeImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })

    test('nodes exists, but not the relationship', async () => {
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
        const image = await seedNode(NodeTypeEnum.IMAGE)

        const relationship = await deleteSpecificRelationship(
            trackLayout.id,
            image.id,
            DbRelationship.TrackLayoutHasPrimeImage,
        )

        expect(relationship)
            .toBeFalsy()
    })

    test('neither the nodes, nor the relationship exist', async () => {
        const relationship = await deleteSpecificRelationship(
            -42,
            -43,
            DbRelationship.TrackLayoutHasPrimeImage,
        )

        expect(relationship)
            .toBeFalsy()
    })
})
