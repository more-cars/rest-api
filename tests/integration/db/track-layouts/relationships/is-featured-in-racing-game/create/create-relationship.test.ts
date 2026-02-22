import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Creating a ›is-featured-in-racing-game‹ relationship', () => {
    test('with valid data', async () => {
        const trackLayout = await seedNode(DbNodeType.TrackLayout)
        const racingGame = await seedNode(DbNodeType.RacingGame)

        const createdRelationship = await createRelationship(
            trackLayout.properties.id,
            racingGame.properties.id,
            RelationshipType.TrackLayoutIsFeaturedInRacingGame,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', trackLayout.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', racingGame.properties.id)
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
        const trackLayout = await seedNode(DbNodeType.TrackLayout)

        const createdRelationship = await createRelationship(
            trackLayout.properties.id,
            -42,
            RelationshipType.TrackLayoutIsFeaturedInRacingGame,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
