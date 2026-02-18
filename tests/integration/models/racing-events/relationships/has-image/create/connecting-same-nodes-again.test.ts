import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›has-image‹ relationship again', async () => {
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(RacingEvent.createHasImageRelationship(racingEvent.id, image.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(RacingEvent.createHasImageRelationship(racingEvent.id, image.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
