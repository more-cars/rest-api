import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›belongs-to-race-track‹ relationship again', async () => {
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
    const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)

    await expect(TrackLayout.createBelongsToRaceTrackRelationship(trackLayout.id, raceTrack.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(TrackLayout.createBelongsToRaceTrackRelationship(trackLayout.id, raceTrack.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
