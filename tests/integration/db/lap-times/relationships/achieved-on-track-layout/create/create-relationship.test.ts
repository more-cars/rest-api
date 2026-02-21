import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›achieved-on-track-layout‹ relationship', () => {
    test('with valid data', async () => {
        const lapTime = await seedNode(ControllerNodeType.LapTime)
        const trackLayout = await seedNode(ControllerNodeType.TrackLayout)

        const createdRelationship = await createRelationship(
            lapTime.properties.id,
            trackLayout.properties.id,
            RelationshipType.LapTimeAchievedOnTrackLayout,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', lapTime.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', trackLayout.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.LapTimeAchievedOnTrackLayout)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const lapTime = await seedNode(ControllerNodeType.LapTime)

        const createdRelationship = await createRelationship(
            lapTime.properties.id,
            -42,
            RelationshipType.LapTimeAchievedOnTrackLayout,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
