import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {CarModel} from "../../../../../../../../src/models/node-types/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-variant‹ relationship with nodes that do not exist', async () => {
    const carModel = await seedNode(DbNodeType.CarModel)
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

    await expect(CarModel.createHasVariantRelationship(-42, carModelVariant.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModel.createHasVariantRelationship(carModel.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModel.createHasVariantRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
