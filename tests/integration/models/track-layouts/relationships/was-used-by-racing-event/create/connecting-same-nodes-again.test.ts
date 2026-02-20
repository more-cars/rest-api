import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›was-used-by-racing-event‹ relationship again', async () => {
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)
    const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)

    await expect(TrackLayout.createWasUsedByRacingEventRelationship(trackLayout.id, racingEvent.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(TrackLayout.createWasUsedByRacingEventRelationship(trackLayout.id, racingEvent.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
