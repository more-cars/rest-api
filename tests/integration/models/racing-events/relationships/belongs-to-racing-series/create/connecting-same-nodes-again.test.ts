import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›belongs-to-racing-series‹ relationship again', async () => {
    const racingEvent = await seedNode(ControllerNodeType.RacingEvent)
    const racingSeries = await seedNode(ControllerNodeType.RacingSeries)

    await expect(RacingEvent.createBelongsToRacingSeriesRelationship(racingEvent.properties.id, racingSeries.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingEvent.createBelongsToRacingSeriesRelationship(racingEvent.properties.id, racingSeries.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
