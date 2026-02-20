import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {Neo4jNodeType} from "../../../../../../../src/db/types/Neo4jNodeType"

test('A RACING EVENT cannot have multiple ›is-followed-by-event‹ relationships', async () => {
    const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)
    const partnersAmount = 3
    const partners = await seedNodes(ControllerNodeType.RACING_EVENT, partnersAmount)

    for (const partner of partners) {
        await RacingEvent.createIsFollowedByEventRelationship(racingEvent.id, partner.id)
    }

    const relationships = await getRelationshipCollection(
        racingEvent.id,
        RelationshipType.RacingEventIsFollowedByEvent,
        Neo4jNodeType.RacingEvent,
    )

    expect(relationships.length)
        .toBe(1)
})
