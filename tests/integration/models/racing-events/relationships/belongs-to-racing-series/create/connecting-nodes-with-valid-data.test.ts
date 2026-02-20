import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›belongs-to-racing-series‹ relationship with valid data', async () => {
    const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)
    const racingSeries = await seedNode(ControllerNodeType.RACING_SERIES)

    const createdRelationship = await RacingEvent.createBelongsToRacingSeriesRelationship(racingEvent.properties.id, racingSeries.properties.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(racingEvent.properties.id)
    expect(createdRelationship.destination.properties.id)
        .toEqual(racingSeries.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingEventBelongsToRacingSeries)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
