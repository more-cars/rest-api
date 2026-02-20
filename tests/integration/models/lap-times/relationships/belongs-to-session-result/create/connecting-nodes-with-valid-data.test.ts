import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›belongs-to-session-result‹ relationship with valid data', async () => {
    const lapTime = await seedNode(ControllerNodeType.LAP_TIME)
    const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)

    const createdRelationship = await LapTime.createBelongsToSessionResultRelationship(lapTime.properties.id, sessionResult.properties.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(lapTime.properties.id)
    expect(createdRelationship.destination.properties.id)
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
