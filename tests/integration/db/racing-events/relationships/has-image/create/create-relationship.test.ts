import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›has-image‹ relationship', () => {
    test('with valid data', async () => {
        const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)
        const image = await seedNode(ControllerNodeType.IMAGE)

        const createdRelationship = await createRelationship(
            racingEvent.id,
            image.id,
            RelationshipType.RacingEventHasImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', racingEvent.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', image.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.RacingEventHasImage)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)

        const createdRelationship = await createRelationship(
            racingEvent.id,
            -42,
            RelationshipType.RacingEventHasImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
