import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingSeries} from "../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-racing-event‹ relationship again', async () => {
    const racingSeries = await seedNode(ControllerNodeType.RACING_SERIES)
    const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)

    await expect(RacingSeries.createHasRacingEventRelationship(racingSeries.properties.id, racingEvent.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingSeries.createHasRacingEventRelationship(racingSeries.properties.id, racingEvent.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
