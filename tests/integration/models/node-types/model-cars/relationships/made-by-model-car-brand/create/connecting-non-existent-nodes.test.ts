import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ModelCar} from "../../../../../../../../src/models/node-types/model-cars/ModelCar"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›made-by-model-car-brand‹ relationship with nodes that do not exist', async () => {
    const modelCar = await seedNode(DbNodeType.ModelCar)
    const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)

    await expect(ModelCar.createMadeByModelCarBrandRelationship(-42, modelCarBrand.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(ModelCar.createMadeByModelCarBrandRelationship(modelCar.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(ModelCar.createMadeByModelCarBrandRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
