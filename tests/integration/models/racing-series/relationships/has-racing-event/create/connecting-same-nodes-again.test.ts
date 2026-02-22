import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {RacingSeries} from "../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-racing-event‹ relationship again', async () => {
    const racingSeries = await seedNode(DbNodeType.RacingSeries)
    const racingEvent = await seedNode(DbNodeType.RacingEvent)

    await expect(RacingSeries.createHasRacingEventRelationship(racingSeries.properties.id, racingEvent.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingSeries.createHasRacingEventRelationship(racingSeries.properties.id, racingEvent.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
