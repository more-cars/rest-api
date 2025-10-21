import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RaceTrack} from "../../../../../../../src/models/race-tracks/RaceTrack"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›has-image‹ relationship again', async () => {
    const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(RaceTrack.createHasImageRelationship(raceTrack.id, image.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(RaceTrack.createHasImageRelationship(raceTrack.id, image.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
