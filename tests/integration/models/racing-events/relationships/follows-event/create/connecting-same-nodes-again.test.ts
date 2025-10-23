import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/racing-events/RacingEvent"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›follows-event‹ relationship again', async () => {
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const partner = await seedNode(NodeTypeEnum.RACING_EVENT)

    await expect(RacingEvent.createFollowsEventRelationship(racingEvent.id, partner.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(RacingEvent.createFollowsEventRelationship(racingEvent.id, partner.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
