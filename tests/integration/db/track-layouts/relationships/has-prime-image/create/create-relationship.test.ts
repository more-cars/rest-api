import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {TrackLayoutRelationship} from "../../../../../../../src/models/track-layouts/types/TrackLayoutRelationship"

describe('Creating a ›has-prime-image‹ relationship', () => {
    test('with valid data', async () => {
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
        const image = await seedNode(NodeTypeEnum.IMAGE)

        const createdRelationship = await createRelationship(
            trackLayout.id,
            image.id,
            DbRelationship.TrackLayoutHasPrimeImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', trackLayout.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', image.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', TrackLayoutRelationship.hasPrimeImage)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

        const createdRelationship = await createRelationship(
            trackLayout.id,
            -42,
            DbRelationship.TrackLayoutHasPrimeImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
