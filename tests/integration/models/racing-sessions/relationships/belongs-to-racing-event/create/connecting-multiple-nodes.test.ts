import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSession} from "../../../../../../../src/models/racing-sessions/RacingSession"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

test('A RACING SESSION cannot have multiple ›belongs-to-racing-event‹ relationships', async () => {
    const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)
    const racingEventsAmount = 3
    const racingEvents = await seedNodes(NodeTypeEnum.RACING_EVENT, racingEventsAmount)

    for (const racingEvent of racingEvents) {
        await RacingSession.createBelongsToRacingEventRelationship(racingSession.id, racingEvent.id)
    }

    const relationships = await getRelationshipCollection(
        racingSession.id,
        DbRelationship.RacingSessionBelongsToRacingEvent,
        NodeTypeLabel.RacingEvent,
        RelationshipDirection.REVERSE,
    )

    expect(relationships.length)
        .toBe(1)
})
