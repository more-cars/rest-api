import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-layout‹ relationship with nodes that do not exist', async () => {
    const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

    await expect(RaceTrack.createHasLayoutRelationship(-42, trackLayout.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RaceTrack.createHasLayoutRelationship(raceTrack.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RaceTrack.createHasLayoutRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
