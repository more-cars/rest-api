import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›belongs-to-racing-series‹ relationship with nodes that do not exist', async () => {
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)

    await expect(RacingEvent.createBelongsToRacingSeriesRelationship(-42, racingSeries.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingEvent.createBelongsToRacingSeriesRelationship(racingEvent.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingEvent.createBelongsToRacingSeriesRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
