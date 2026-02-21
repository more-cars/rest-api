import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingSeries} from "../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A RACING SERIES can have multiple ›has-racing-event‹ relationships', async () => {
    const racingSeries = await seedNode(ControllerNodeType.RacingSeries)
    const racingEventsAmount = 3
    const racingEvents = await seedNodes(ControllerNodeType.RacingEvent, racingEventsAmount)

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
