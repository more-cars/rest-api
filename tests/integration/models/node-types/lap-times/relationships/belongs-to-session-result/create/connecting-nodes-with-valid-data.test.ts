import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {LapTime} from "../../../../../../../../src/models/node-types/lap-times/LapTime"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›belongs-to-session-result‹ relationship with valid data', async () => {
    const lapTime = await seedNode(DbNodeType.LapTime)
    const sessionResult = await seedNode(DbNodeType.SessionResult)

    const createdRelationship = await LapTime.createBelongsToSessionResultRelationship(lapTime.properties.id, sessionResult.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(lapTime.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(sessionResult.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.LapTimeBelongsToSessionResult)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
