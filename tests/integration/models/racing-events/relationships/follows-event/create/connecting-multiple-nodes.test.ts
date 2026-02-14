import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/racing-events/RacingEvent"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

test('A RACING EVENT cannot have multiple ›follows-event‹ relationships', async () => {
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const partnersAmount = 3
    const partners = await seedNodes(NodeTypeEnum.RACING_EVENT, partnersAmount)

    for (const partner of partners) {
        await RacingEvent.createFollowsEventRelationship(racingEvent.id, partner.id)
    }

    const relationships = await getRelationshipCollection(
        racingEvent.id,
        DbRelationship.RacingEventFollowsEvent,
        NodeTypeLabel.RacingEvent,
        RelationshipDirection.REVERSE,
    )

    expect(relationships.length)
        .toBe(1)
})
