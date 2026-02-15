import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSession} from "../../../../../../../src/models/racing-sessions/RacingSession"
import {RelationshipType} from "../../../../../../../src/models/relationships/types/RelationshipType"

test('Creating a ›belongs-to-racing-event‹ relationship with valid data', async () => {
    const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

    const createdRelationship = await RacingSession.createBelongsToRacingEventRelationship(racingSession.id, racingEvent.id)

    expect(createdRelationship.origin.id)
        .toEqual(racingSession.id)
    expect(createdRelationship.destination.id)
        .toEqual(racingEvent.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelationshipType.RacingSessionBelongsToRacingEvent)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
