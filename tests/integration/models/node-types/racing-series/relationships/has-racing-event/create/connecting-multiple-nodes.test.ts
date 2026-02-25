import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {RacingSeries} from "../../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A RACING SERIES can have multiple ›has-racing-event‹ relationships', async () => {
    const racingSeries = await seedNode(DbNodeType.RacingSeries)
    const racingEventsAmount = 3
    const racingEvents = await seedNodes(DbNodeType.RacingEvent, racingEventsAmount)

    for (const racingEvent of racingEvents) {
        await RacingSeries.createHasRacingEventRelationship(racingSeries.properties.id, racingEvent.properties.id)
    }

    const relationships = await getRelationshipCollection(
        racingSeries.properties.id,
        RelationshipType.RacingSeriesHasRacingEvent,
        DbNodeType.RacingEvent,
    )

    expect(relationships.length)
        .toBe(racingEventsAmount)
})
