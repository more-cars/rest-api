import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A RACING EVENT cannot have multiple ›follows-event‹ relationships', async () => {
    const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)
    const partnersAmount = 3
    const partners = await seedNodes(ControllerNodeType.RACING_EVENT, partnersAmount)

    for (const partner of partners) {
        await RacingEvent.createFollowsEventRelationship(racingEvent.id, partner.id)
    }

    const relationships = await getRelationshipCollection(
        racingEvent.id,
        RelationshipType.RacingEventFollowsEvent,
        DbNodeType.RacingEvent,
    )

    expect(relationships.length)
        .toBe(1)
})
