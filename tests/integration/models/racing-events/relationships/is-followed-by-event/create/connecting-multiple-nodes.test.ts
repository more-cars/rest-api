import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

test('A RACING EVENT cannot have multiple ›is-followed-by-event‹ relationships', async () => {
    const racingEvent = await seedNode(DbNodeType.RacingEvent)
    const partnersAmount = 3
    const partners = await seedNodes(DbNodeType.RacingEvent, partnersAmount)

    for (const partner of partners) {
        await RacingEvent.createIsFollowedByEventRelationship(racingEvent.properties.id, partner.properties.id)
    }

    const relationships = await getRelationshipCollection(
        racingEvent.properties.id,
        RelationshipType.RacingEventIsFollowedByEvent,
        DbNodeType.RacingEvent,
    )

    expect(relationships.length)
        .toBe(1)
})
