import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {SessionResult} from "../../../../../../../src/models/session-results/SessionResult"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›achieved-with-car-model-variant‹ relationship with valid data', async () => {
    const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)
    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

    const createdRelationship = await SessionResult.createAchievedWithCarModelVariantRelationship(sessionResult.id, carModelVariant.id)

    expect(createdRelationship.origin.id)
        .toEqual(sessionResult.id)
    expect(createdRelationship.destination.id)
        .toEqual(carModelVariant.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.SessionResultAchievedWithCarModelVariant)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
