import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A RACING EVENT cannot have multiple ›belongs-to-racing-series‹ relationships', async () => {
    const racingEvent = await seedNode(ControllerNodeType.RacingEvent)
    const racingSeriesAmount = 3
    const racingSeriess = await seedNodes(ControllerNodeType.RacingSeries, racingSeriesAmount)

    for (const racingSeries of racingSeriess) {
        await RacingEvent.createBelongsToRacingSeriesRelationship(racingEvent.properties.id, racingSeries.properties.id)
    }

    const relationships = await getRelationshipCollection(
        racingEvent.properties.id,
        RelationshipType.RacingEventBelongsToRacingSeries,
        DbNodeType.RacingSeries,
    )

    expect(relationships.length)
        .toBe(1)
})
