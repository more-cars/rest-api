import {describe, expect, test} from 'vitest'
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›hosted-racing-event‹ relationships', () => {
    test('node and relationships exist', async () => {
        const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)
        await seedRelationshipForStartNode(raceTrack.id, ControllerNodeType.RACING_EVENT, RelationshipType.RaceTrackHostedRacingEvent)
        await seedRelationshipForStartNode(raceTrack.id, ControllerNodeType.RACING_EVENT, RelationshipType.RaceTrackHostedRacingEvent)

        const relationships = await RaceTrack.getAllHostedRacingEventRelationships(raceTrack.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)

        const relationships = await RaceTrack.getAllHostedRacingEventRelationships(raceTrack.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(RaceTrack.getAllHostedRacingEventRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
