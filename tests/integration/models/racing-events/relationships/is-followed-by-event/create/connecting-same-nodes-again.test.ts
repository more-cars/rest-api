import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›is-followed-by-event‹ relationship again', async () => {
    const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)
    const partner = await seedNode(ControllerNodeType.RACING_EVENT)

    await expect(RacingEvent.createIsFollowedByEventRelationship(racingEvent.id, partner.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingEvent.createIsFollowedByEventRelationship(racingEvent.id, partner.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
