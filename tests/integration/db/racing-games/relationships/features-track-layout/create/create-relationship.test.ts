import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›features-track-layout‹ relationship', () => {
    test('with valid data', async () => {
        const racingGame = await seedNode(ControllerNodeType.RacingGame)
        const trackLayout = await seedNode(ControllerNodeType.TrackLayout)

        const createdRelationship = await createRelationship(
            racingGame.properties.id,
            trackLayout.properties.id,
            RelationshipType.RacingGameFeaturesTrackLayout,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', racingGame.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', trackLayout.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.RacingGameFeaturesTrackLayout)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const racingGame = await seedNode(ControllerNodeType.RacingGame)

        const createdRelationship = await createRelationship(
            racingGame.properties.id,
            -42,
            RelationshipType.RacingGameFeaturesTrackLayout,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
