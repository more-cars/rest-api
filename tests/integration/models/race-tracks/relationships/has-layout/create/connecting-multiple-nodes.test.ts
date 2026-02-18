import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

test('A RACE TRACK can have multiple ›has-layout‹ relationships', async () => {
    const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)
    const trackLayoutsAmount = 3
    const trackLayouts = await seedNodes(NodeTypeEnum.TRACK_LAYOUT, trackLayoutsAmount)

    for (const trackLayout of trackLayouts) {
        await RaceTrack.createHasLayoutRelationship(raceTrack.id, trackLayout.id)
    }

    const relationships = await getRelationshipCollection(
        raceTrack.id,
        RelationshipType.RaceTrackHasLayout,
        NodeTypeLabel.TrackLayout,
    )

    expect(relationships.length)
        .toBe(trackLayoutsAmount)
})
