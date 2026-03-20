import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ModelCar} from "../../../../../../../../src/models/node-types/model-cars/ModelCar"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›made-by-model-car-brand‹ relationship again', async () => {
    const modelCar = await seedNode(DbNodeType.ModelCar)
    const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)

    await expect(ModelCar.createMadeByModelCarBrandRelationship(modelCar.properties.id, modelCarBrand.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(ModelCar.createMadeByModelCarBrandRelationship(modelCar.properties.id, modelCarBrand.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
