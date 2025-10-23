import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSeries} from "../../../../../../../src/models/racing-series/RacingSeries"
import {getRelationshipsForSpecificNode} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A RACING SERIES can have multiple ›has-racing-event‹ relationships', async () => {
    const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)
    const racingEventsAmount = 3
    const racingEvents = await seedNodes(NodeTypeEnum.RACING_EVENT, racingEventsAmount)

    for (const racingEvent of racingEvents) {
        await RacingSeries.createHasRacingEventRelationship(racingSeries.id, racingEvent.id)
    }

    const relationships = await getRelationshipsForSpecificNode(racingSeries.id, DbRelationship.RacingSeriesHasRacingEvent)

    expect(relationships.length)
        .toBe(racingEventsAmount)
})
