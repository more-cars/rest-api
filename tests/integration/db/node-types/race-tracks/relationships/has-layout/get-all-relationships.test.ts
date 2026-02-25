import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting all ›has-layout‹ relationships', () => {
    test('node and relationships exist', async () => {
        const raceTrack = await seedNode(DbNodeType.RaceTrack)
        await seedRelationshipForStartNode(raceTrack.properties.id, DbNodeType.TrackLayout, RelationshipType.RaceTrackHasLayout)
        await seedRelationshipForStartNode(raceTrack.properties.id, DbNodeType.TrackLayout, RelationshipType.RaceTrackHasLayout)

        const relationships = await getRelationshipCollection(
            raceTrack.properties.id,
            RelationshipType.RaceTrackHasLayout,
            DbNodeType.TrackLayout,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const raceTrack = await seedNode(DbNodeType.RaceTrack)

        const relationships = await getRelationshipCollection(
            raceTrack.properties.id,
            RelationshipType.RaceTrackHasLayout,
            DbNodeType.TrackLayout,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.RaceTrackHasLayout,
            DbNodeType.TrackLayout,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
