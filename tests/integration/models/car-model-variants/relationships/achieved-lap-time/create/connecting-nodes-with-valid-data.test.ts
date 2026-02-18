import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›achieved-lap-time‹ relationship with valid data', async () => {
    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
    const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)

    const createdRelationship = await CarModelVariant.createAchievedLapTimeRelationship(carModelVariant.id, lapTime.id)

    expect(createdRelationship.origin.id)
        .toEqual(carModelVariant.id)
    expect(createdRelationship.destination.id)
        .toEqual(lapTime.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.CarModelVariantAchievedLapTime)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
