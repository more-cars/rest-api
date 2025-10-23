import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/racing-events/RacingEvent"
import {getRelationshipsForSpecificNode} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A RACING EVENT cannot have multiple ›belongs-to-racing-series‹ relationships', async () => {
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const racingSeriesAmount = 3
    const racingSeries = await seedNodes(NodeTypeEnum.RACING_SERIES, racingSeriesAmount)

    for (const racingSeries of racingSeries) {
        await RacingEvent.createBelongsToRacingSeriesRelationship(racingEvent.id, racingSeries.id)
    }

    const relationships = await getRelationshipsForSpecificNode(racingEvent.id, DbRelationship.RacingEventBelongsToRacingSeries)

    expect(relationships.length)
        .toBe(1)
})
