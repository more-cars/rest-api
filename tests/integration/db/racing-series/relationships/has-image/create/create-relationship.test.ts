import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSeriesRelationship} from "../../../../../../../src/models/racing-series/types/RacingSeriesRelationship"

describe('Creating a ›has-image‹ relationship', () => {
    test('with valid data', async () => {
        const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)
        const image = await seedNode(NodeTypeEnum.IMAGE)

        const createdRelationship = await createRelationship(
            racingSeries.id,
            image.id,
            DbRelationship.RacingSeriesHasImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', racingSeries.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', image.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', RacingSeriesRelationship.hasImage)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)

        const createdRelationship = await createRelationship(
            racingSeries.id,
            -42,
            DbRelationship.RacingSeriesHasImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
