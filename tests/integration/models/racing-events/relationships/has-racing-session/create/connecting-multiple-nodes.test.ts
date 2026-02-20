import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {Neo4jNodeType} from "../../../../../../../src/db/types/Neo4jNodeType"

test('A RACING EVENT can have multiple ›has-racing-session‹ relationships', async () => {
    const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)
    const racingSessionsAmount = 3
    const racingSessions = await seedNodes(ControllerNodeType.RACING_SESSION, racingSessionsAmount)

    for (const racingSession of racingSessions) {
        await RacingEvent.createHasRacingSessionRelationship(racingEvent.id, racingSession.id)
    }

    const relationships = await getRelationshipCollection(
        racingEvent.id,
        RelationshipType.RacingEventHasRacingSession,
        Neo4jNodeType.RacingSession,
    )

    expect(relationships.length)
        .toBe(racingSessionsAmount)
})
