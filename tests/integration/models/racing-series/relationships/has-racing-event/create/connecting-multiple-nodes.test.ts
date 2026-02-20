import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingSeries} from "../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

test('A RACING SERIES can have multiple ›has-racing-event‹ relationships', async () => {
    const racingSeries = await seedNode(ControllerNodeType.RACING_SERIES)
    const racingEventsAmount = 3
    const racingEvents = await seedNodes(ControllerNodeType.RACING_EVENT, racingEventsAmount)

    for (const racingEvent of racingEvents) {
        await RacingSeries.createHasRacingEventRelationship(racingSeries.id, racingEvent.id)
    }

    const relationships = await getRelationshipCollection(
        racingSeries.id,
        RelationshipType.RacingSeriesHasRacingEvent,
        NodeTypeLabel.RacingEvent,
    )

    expect(relationships.length)
        .toBe(racingEventsAmount)
})
