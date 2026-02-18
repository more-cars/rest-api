import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›achieved-session-result‹ relationship with valid data', async () => {
    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
    const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

    const createdRelationship = await CarModelVariant.createAchievedSessionResultRelationship(carModelVariant.id, sessionResult.id)

    expect(createdRelationship.origin.id)
        .toEqual(carModelVariant.id)
    expect(createdRelationship.destination.id)
        .toEqual(sessionResult.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.CarModelVariantAchievedSessionResult)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
