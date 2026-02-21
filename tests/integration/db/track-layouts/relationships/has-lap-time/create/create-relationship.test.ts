import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›has-lap-time‹ relationship', () => {
    test('with valid data', async () => {
        const trackLayout = await seedNode(ControllerNodeType.TrackLayout)
        const lapTime = await seedNode(ControllerNodeType.LapTime)

        const createdRelationship = await createRelationship(
            trackLayout.properties.id,
            lapTime.properties.id,
            RelationshipType.TrackLayoutHasLapTime,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', trackLayout.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', lapTime.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.TrackLayoutHasLapTime)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const trackLayout = await seedNode(ControllerNodeType.TrackLayout)

        const createdRelationship = await createRelationship(
            trackLayout.properties.id,
            -42,
            RelationshipType.TrackLayoutHasLapTime,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
