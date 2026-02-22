import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›belongs-to-racing-event‹ relationship with valid data', async () => {
    const racingSession = await seedNode(DbNodeType.RacingSession)
    const racingEvent = await seedNode(DbNodeType.RacingEvent)

    const createdRelationship = await RacingSession.createBelongsToRacingEventRelationship(racingSession.properties.id, racingEvent.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(racingSession.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(racingEvent.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingSessionBelongsToRacingEvent)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
