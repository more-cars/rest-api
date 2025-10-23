import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSeries} from "../../../../../../../src/models/racing-series/RacingSeries"
import {RacingSeriesRelationship} from "../../../../../../../src/models/racing-series/types/RacingSeriesRelationship"

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
        .toEqual(RacingSeriesRelationship.hasRacingEvent)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
