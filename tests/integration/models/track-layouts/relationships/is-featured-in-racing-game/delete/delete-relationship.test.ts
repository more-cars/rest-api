import {describe, expect, test} from 'vitest'
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›is-featured-in-racing-game‹ relationship', () => {
    test('TRACK LAYOUT node does not exist', async () => {
        const trackLayout = await seedNode(DbNodeType.TrackLayout)

        await expect(TrackLayout.deleteIsFeaturedInRacingGameRelationship(trackLayout.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING GAME node does not exist', async () => {
        const racingGame = await seedNode(DbNodeType.RacingGame)

        await expect(TrackLayout.deleteIsFeaturedInRacingGameRelationship(-42, racingGame.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('TRACK LAYOUT node and RACING GAME node do not exist', async () => {
        await expect(TrackLayout.deleteIsFeaturedInRacingGameRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›is-featured-in-racing-game‹ relationship', async () => {
        const trackLayout = await seedNode(DbNodeType.TrackLayout)
        const racingGame = await seedNode(DbNodeType.RacingGame)

        await expect(TrackLayout.deleteIsFeaturedInRacingGameRelationship(trackLayout.properties.id, racingGame.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›is-featured-in-racing-game‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.TrackLayout, DbNodeType.RacingGame, RelationshipType.TrackLayoutIsFeaturedInRacingGame)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.TrackLayoutIsFeaturedInRacingGame,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await TrackLayout.deleteIsFeaturedInRacingGameRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.TrackLayoutIsFeaturedInRacingGame,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
