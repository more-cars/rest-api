import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/racing-events/RacingEvent"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›belongs-to-racing-series‹ relationship with valid data', async () => {
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)

    const createdRelationship = await RacingEvent.createBelongsToRacingSeriesRelationship(racingEvent.id, racingSeries.id)

    expect(createdRelationship.origin.id)
        .toEqual(racingEvent.id)
    expect(createdRelationship.destination.id)
        .toEqual(racingSeries.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingEventBelongsToRacingSeries)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
