import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›belongs-to-session-result‹ relationship with valid data', async () => {
    const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)
    const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

    const createdRelationship = await LapTime.createBelongsToSessionResultRelationship(lapTime.id, sessionResult.id)

    expect(createdRelationship.origin.id)
        .toEqual(lapTime.id)
    expect(createdRelationship.destination.id)
        .toEqual(sessionResult.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.LapTimeBelongsToSessionResult)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
