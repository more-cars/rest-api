import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

test('A RACING SESSION cannot have multiple ›belongs-to-racing-event‹ relationships', async () => {
    const racingSession = await seedNode(ControllerNodeType.RACING_SESSION)
    const racingEventsAmount = 3
    const racingEvents = await seedNodes(ControllerNodeType.RACING_EVENT, racingEventsAmount)

    for (const racingEvent of racingEvents) {
        await RacingSession.createBelongsToRacingEventRelationship(racingSession.id, racingEvent.id)
    }

    const relationships = await getRelationshipCollection(
        racingSession.id,
        RelationshipType.RacingSessionBelongsToRacingEvent,
        NodeTypeLabel.RacingEvent,
    )

    expect(relationships.length)
        .toBe(1)
})
