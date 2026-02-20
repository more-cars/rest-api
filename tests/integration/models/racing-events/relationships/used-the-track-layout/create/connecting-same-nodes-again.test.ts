import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›used-the-track-layout‹ relationship again', async () => {
    const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

    await expect(RacingEvent.createUsedTheTrackLayoutRelationship(racingEvent.id, trackLayout.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingEvent.createUsedTheTrackLayoutRelationship(racingEvent.id, trackLayout.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
