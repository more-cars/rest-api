import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSeries} from "../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-racing-event‹ relationship with valid data', async () => {
    const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

    const createdRelationship = await RacingSeries.createHasRacingEventRelationship(racingSeries.id, racingEvent.id)

    expect(createdRelationship.origin.id)
        .toEqual(racingSeries.id)
    expect(createdRelationship.destination.id)
        .toEqual(racingEvent.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingSeriesHasRacingEvent)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
