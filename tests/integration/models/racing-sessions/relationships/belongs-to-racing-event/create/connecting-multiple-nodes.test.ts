import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A RACING SESSION cannot have multiple ›belongs-to-racing-event‹ relationships', async () => {
    const racingSession = await seedNode(ControllerNodeType.RacingSession)
    const racingEventsAmount = 3
    const racingEvents = await seedNodes(ControllerNodeType.RacingEvent, racingEventsAmount)

    for (const racingEvent of racingEvents) {
        await RacingSession.createBelongsToRacingEventRelationship(racingSession.properties.id, racingEvent.properties.id)
    }

    const relationships = await getRelationshipCollection(
        racingSession.properties.id,
        RelationshipType.RacingSessionBelongsToRacingEvent,
        DbNodeType.RacingEvent,
    )

    expect(relationships.length)
        .toBe(1)
})
