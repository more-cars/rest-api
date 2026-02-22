import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

test('A RACE TRACK can have multiple ›has-layout‹ relationships', async () => {
    const raceTrack = await seedNode(DbNodeType.RaceTrack)
    const trackLayoutsAmount = 3
    const trackLayouts = await seedNodes(DbNodeType.TrackLayout, trackLayoutsAmount)

    for (const trackLayout of trackLayouts) {
        await RaceTrack.createHasLayoutRelationship(raceTrack.properties.id, trackLayout.properties.id)
    }

    const relationships = await getRelationshipCollection(
        raceTrack.properties.id,
        RelationshipType.RaceTrackHasLayout,
        DbNodeType.TrackLayout,
    )

    expect(relationships.length)
        .toBe(trackLayoutsAmount)
})
