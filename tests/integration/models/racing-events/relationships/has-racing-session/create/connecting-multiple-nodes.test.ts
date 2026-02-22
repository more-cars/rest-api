import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

test('A RACING EVENT can have multiple ›has-racing-session‹ relationships', async () => {
    const racingEvent = await seedNode(DbNodeType.RacingEvent)
    const racingSessionsAmount = 3
    const racingSessions = await seedNodes(DbNodeType.RacingSession, racingSessionsAmount)

    for (const racingSession of racingSessions) {
        await RacingEvent.createHasRacingSessionRelationship(racingEvent.properties.id, racingSession.properties.id)
    }

    const relationships = await getRelationshipCollection(
        racingEvent.properties.id,
        RelationshipType.RacingEventHasRacingSession,
        DbNodeType.RacingSession,
    )

    expect(relationships.length)
        .toBe(racingSessionsAmount)
})
