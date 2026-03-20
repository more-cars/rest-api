import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ModelCarBrand} from "../../../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›created-model-car‹ relationship again', async () => {
    const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)
    const modelCar = await seedNode(DbNodeType.ModelCar)

    await expect(ModelCarBrand.createCreatedModelCarRelationship(modelCarBrand.properties.id, modelCar.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(ModelCarBrand.createCreatedModelCarRelationship(modelCarBrand.properties.id, modelCar.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
