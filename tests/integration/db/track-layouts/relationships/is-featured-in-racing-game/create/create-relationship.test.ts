import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›is-featured-in-racing-game‹ relationship', () => {
    test('with valid data', async () => {
        const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)
        const racingGame = await seedNode(ControllerNodeType.RACING_GAME)

        const createdRelationship = await createRelationship(
            trackLayout.id,
            racingGame.id,
            RelationshipType.TrackLayoutIsFeaturedInRacingGame,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', trackLayout.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', racingGame.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.TrackLayoutIsFeaturedInRacingGame)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

        const createdRelationship = await createRelationship(
            trackLayout.id,
            -42,
            RelationshipType.TrackLayoutIsFeaturedInRacingGame,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
