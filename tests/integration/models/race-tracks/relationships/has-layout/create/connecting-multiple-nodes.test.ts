import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A RACE TRACK can have multiple ›has-layout‹ relationships', async () => {
    const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)
    const trackLayoutsAmount = 3
    const trackLayouts = await seedNodes(ControllerNodeType.TRACK_LAYOUT, trackLayoutsAmount)

    for (const trackLayout of trackLayouts) {
        await RaceTrack.createHasLayoutRelationship(raceTrack.id, trackLayout.id)
    }

    const relationships = await getRelationshipCollection(
        raceTrack.id,
        RelationshipType.RaceTrackHasLayout,
        DbNodeType.TrackLayout,
    )

    expect(relationships.length)
        .toBe(trackLayoutsAmount)
})
