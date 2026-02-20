import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›achieved-with-car-model-variant‹ relationship with valid data', async () => {
    const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)
    const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)

    const createdRelationship = await SessionResult.createAchievedWithCarModelVariantRelationship(sessionResult.id, carModelVariant.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(sessionResult.id)
    expect(createdRelationship.destination.properties.id)
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
