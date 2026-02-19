import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Creating a ›has-image‹ relationship', () => {
    test('with valid data', async () => {
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
        const image = await seedNode(NodeTypeEnum.IMAGE)

        const createdRelationship = await createRelationship(
            racingEvent.id,
            image.id,
            RelationshipType.RacingEventHasImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', racingEvent.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', image.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', RelationshipType.RacingEventHasImage)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

        const createdRelationship = await createRelationship(
            racingEvent.id,
            -42,
            RelationshipType.RacingEventHasImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
