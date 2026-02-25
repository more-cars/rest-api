import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RacingSeries} from "../../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-racing-event‹ relationship with valid data', async () => {
    const racingSeries = await seedNode(DbNodeType.RacingSeries)
    const racingEvent = await seedNode(DbNodeType.RacingEvent)

    const createdRelationship = await RacingSeries.createHasRacingEventRelationship(racingSeries.properties.id, racingEvent.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(racingSeries.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(racingEvent.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingSeriesHasRacingEvent)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
