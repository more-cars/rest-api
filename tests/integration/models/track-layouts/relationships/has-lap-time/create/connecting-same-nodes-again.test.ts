import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›has-lap-time‹ relationship again', async () => {
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
    const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)

    await expect(TrackLayout.createHasLapTimeRelationship(trackLayout.id, lapTime.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(TrackLayout.createHasLapTimeRelationship(trackLayout.id, lapTime.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
