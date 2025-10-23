import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {TrackLayout} from "../../../../../../../src/models/track-layouts/TrackLayout"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›was-used-by-racing-event‹ relationship again', async () => {
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

    await expect(TrackLayout.createWasUsedByRacingEventRelationship(trackLayout.id, racingEvent.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(TrackLayout.createWasUsedByRacingEventRelationship(trackLayout.id, racingEvent.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
