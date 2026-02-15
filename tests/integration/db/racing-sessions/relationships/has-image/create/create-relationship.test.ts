import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Creating a ›has-image‹ relationship', () => {
    test('with valid data', async () => {
        const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)
        const image = await seedNode(NodeTypeEnum.IMAGE)

        const createdRelationship = await createRelationship(
            racingSession.id,
            image.id,
            DbRelationship.RacingSessionHasImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', racingSession.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', image.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', DbRelationship.RacingSessionHasImage)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)

        const createdRelationship = await createRelationship(
            racingSession.id,
            -42,
            DbRelationship.RacingSessionHasImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
