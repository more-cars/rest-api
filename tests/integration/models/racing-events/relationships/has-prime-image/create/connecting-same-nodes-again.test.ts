import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-prime-image‹ relationship again', async () => {
    const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)
    const image = await seedNode(ControllerNodeType.IMAGE)

    await expect(RacingEvent.createHasPrimeImageRelationship(racingEvent.properties.id, image.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingEvent.createHasPrimeImageRelationship(racingEvent.properties.id, image.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
