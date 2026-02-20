import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {Neo4jNodeType} from "../../../../../../../src/db/types/Neo4jNodeType"

describe('Requesting all ›hosted-racing-event‹ relationships', () => {
    test('node and relationships exist', async () => {
        const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)
        await seedRelationshipForStartNode(raceTrack.id, ControllerNodeType.RACING_EVENT, RelationshipType.RaceTrackHostedRacingEvent)
        await seedRelationshipForStartNode(raceTrack.id, ControllerNodeType.RACING_EVENT, RelationshipType.RaceTrackHostedRacingEvent)

        const relationships = await getRelationshipCollection(
            raceTrack.id,
            RelationshipType.RaceTrackHostedRacingEvent,
            Neo4jNodeType.RacingEvent,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)

        const relationships = await getRelationshipCollection(
            raceTrack.id,
            RelationshipType.RaceTrackHostedRacingEvent,
            Neo4jNodeType.RacingEvent,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.RaceTrackHostedRacingEvent,
            Neo4jNodeType.RacingEvent,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
