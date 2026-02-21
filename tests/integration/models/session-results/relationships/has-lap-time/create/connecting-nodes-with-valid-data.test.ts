import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-lap-time‹ relationship with valid data', async () => {
    const sessionResult = await seedNode(ControllerNodeType.SessionResult)
    const lapTime = await seedNode(ControllerNodeType.LapTime)

    const createdRelationship = await SessionResult.createHasLapTimeRelationship(sessionResult.properties.id, lapTime.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(sessionResult.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(lapTime.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.SessionResultHasLapTime)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
