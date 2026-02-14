import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/racing-events/RacingEvent"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

test('A RACING EVENT cannot have multiple ›belongs-to-racing-series‹ relationships', async () => {
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const racingSeriesAmount = 3
    const racingSeriess = await seedNodes(NodeTypeEnum.RACING_SERIES, racingSeriesAmount)

    for (const racingSeries of racingSeriess) {
        await RacingEvent.createBelongsToRacingSeriesRelationship(racingEvent.id, racingSeries.id)
    }

    const relationships = await getRelationshipCollection(
        racingEvent.id,
        DbRelationship.RacingEventBelongsToRacingSeries,
        NodeTypeLabel.RacingSeries,
        RelationshipDirection.REVERSE,
    )

    expect(relationships.length)
        .toBe(1)
})
