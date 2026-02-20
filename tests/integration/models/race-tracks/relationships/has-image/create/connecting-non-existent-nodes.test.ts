import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-image‹ relationship with nodes that do not exist', async () => {
    const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)
    const image = await seedNode(ControllerNodeType.IMAGE)

    await expect(RaceTrack.createHasImageRelationship(-42, image.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RaceTrack.createHasImageRelationship(raceTrack.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RaceTrack.createHasImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
