import {describe, expect, test} from 'vitest'
import {RaceTrack} from "../../../../../../../src/models/race-tracks/RaceTrack"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-layout‹ relationships', () => {
    test('node and relationships exist', async () => {
        const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)
        await seedRelationshipForStartNode(raceTrack.id, NodeTypeEnum.TRACK_LAYOUT, RelationshipType.RaceTrackHasLayout)
        await seedRelationshipForStartNode(raceTrack.id, NodeTypeEnum.TRACK_LAYOUT, RelationshipType.RaceTrackHasLayout)

        const relationships = await RaceTrack.getAllHasLayoutRelationships(raceTrack.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)

        const relationships = await RaceTrack.getAllHasLayoutRelationships(raceTrack.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(RaceTrack.getAllHasLayoutRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
