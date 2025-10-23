import {describe, expect, test} from 'vitest'
import {RaceTrack} from "../../../../../../../src/models/race-tracks/RaceTrack"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›hosted-racing-event‹ relationships', () => {
    test('node and relationships exist', async () => {
        const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)
        await seedRelationshipForStartNode(raceTrack.id, NodeTypeEnum.RACING_EVENT, DbRelationship.RaceTrackHostedRacingEvent)
        await seedRelationshipForStartNode(raceTrack.id, NodeTypeEnum.RACING_EVENT, DbRelationship.RaceTrackHostedRacingEvent)

        const relationships = await RaceTrack.getAllHostedRacingEventRelationships(raceTrack.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)

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
