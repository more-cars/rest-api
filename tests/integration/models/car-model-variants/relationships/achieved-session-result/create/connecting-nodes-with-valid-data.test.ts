import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›achieved-session-result‹ relationship with valid data', async () => {
    const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)
    const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)

    const createdRelationship = await CarModelVariant.createAchievedSessionResultRelationship(carModelVariant.properties.id, sessionResult.properties.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(carModelVariant.properties.id)
    expect(createdRelationship.destination.properties.id)
        .toEqual(sessionResult.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.CarModelVariantAchievedSessionResult)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
