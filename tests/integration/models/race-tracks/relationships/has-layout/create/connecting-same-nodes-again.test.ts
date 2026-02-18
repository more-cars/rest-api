import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›has-layout‹ relationship again', async () => {
    const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

    await expect(RaceTrack.createHasLayoutRelationship(raceTrack.id, trackLayout.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(RaceTrack.createHasLayoutRelationship(raceTrack.id, trackLayout.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
