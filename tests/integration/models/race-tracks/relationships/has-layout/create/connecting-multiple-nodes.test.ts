import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RaceTrack} from "../../../../../../../src/models/race-tracks/RaceTrack"
import {
    getRelationshipCollection
} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A RACE TRACK can have multiple ›has-layout‹ relationships', async () => {
    const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)
    const trackLayoutsAmount = 3
    const trackLayouts = await seedNodes(NodeTypeEnum.TRACK_LAYOUT, trackLayoutsAmount)

    for (const trackLayout of trackLayouts) {
        await RaceTrack.createHasLayoutRelationship(raceTrack.id, trackLayout.id)
    }

    const relationships = await getRelationshipCollection(raceTrack.id, DbRelationship.RaceTrackHasLayout)

    expect(relationships.length)
        .toBe(trackLayoutsAmount)
})
