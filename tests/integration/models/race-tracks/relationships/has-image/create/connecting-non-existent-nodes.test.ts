import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-image‹ relationship with nodes that do not exist', async () => {
    const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(RaceTrack.createHasImageRelationship(-42, image.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RaceTrack.createHasImageRelationship(raceTrack.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RaceTrack.createHasImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
