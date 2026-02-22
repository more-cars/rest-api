import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {RacingSeries} from "../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-racing-event‹ relationship with nodes that do not exist', async () => {
    const racingSeries = await seedNode(DbNodeType.RacingSeries)
    const racingEvent = await seedNode(DbNodeType.RacingEvent)

    await expect(RacingSeries.createHasRacingEventRelationship(-42, racingEvent.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingSeries.createHasRacingEventRelationship(racingSeries.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingSeries.createHasRacingEventRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
