import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-image‹ relationship with valid data', async () => {
    const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)
    const image = await seedNode(ControllerNodeType.IMAGE)

    const createdRelationship = await SessionResult.createHasImageRelationship(sessionResult.id, image.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(sessionResult.id)
    expect(createdRelationship.destination.properties.id)
        .toEqual(image.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.SessionResultHasImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
