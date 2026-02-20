import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

test('A RACING EVENT cannot have multiple ›belongs-to-racing-series‹ relationships', async () => {
    const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)
    const racingSeriesAmount = 3
    const racingSeriess = await seedNodes(ControllerNodeType.RACING_SERIES, racingSeriesAmount)

    for (const racingSeries of racingSeriess) {
        await RacingEvent.createBelongsToRacingSeriesRelationship(racingEvent.id, racingSeries.id)
    }

    const relationships = await getRelationshipCollection(
        racingEvent.id,
        RelationshipType.RacingEventBelongsToRacingSeries,
        NodeTypeLabel.RacingSeries,
    )

    expect(relationships.length)
        .toBe(1)
})
