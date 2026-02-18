import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-prime-image‹ relationship with valid data', async () => {
    const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    const createdRelationship = await SessionResult.createHasPrimeImageRelationship(sessionResult.id, image.id)

    expect(createdRelationship.origin.id)
        .toEqual(sessionResult.id)
    expect(createdRelationship.destination.id)
        .toEqual(image.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.SessionResultHasPrimeImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
