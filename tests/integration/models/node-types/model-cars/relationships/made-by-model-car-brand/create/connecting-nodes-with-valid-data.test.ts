import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ModelCar} from "../../../../../../../../src/models/node-types/model-cars/ModelCar"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›made-by-model-car-brand‹ relationship with valid data', async () => {
    const modelCar = await seedNode(DbNodeType.ModelCar)
    const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)

    const createdRelationship = await ModelCar.createMadeByModelCarBrandRelationship(modelCar.properties.id, modelCarBrand.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(modelCar.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(modelCarBrand.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.ModelCarMadeByModelCarBrand)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
