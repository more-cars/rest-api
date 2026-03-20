import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ModelCarBrand} from "../../../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›created-model-car‹ relationship with nodes that do not exist', async () => {
    const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)
    const modelCar = await seedNode(DbNodeType.ModelCar)

    await expect(ModelCarBrand.createCreatedModelCarRelationship(-42, modelCar.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(ModelCarBrand.createCreatedModelCarRelationship(modelCarBrand.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(ModelCarBrand.createCreatedModelCarRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
