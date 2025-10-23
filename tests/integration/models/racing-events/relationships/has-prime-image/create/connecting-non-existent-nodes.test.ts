import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-prime-image‹ relationship with nodes that do not exist', async () => {
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(RacingEvent.createHasPrimeImageRelationship(-42, image.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingEvent.createHasPrimeImageRelationship(racingEvent.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingEvent.createHasPrimeImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
