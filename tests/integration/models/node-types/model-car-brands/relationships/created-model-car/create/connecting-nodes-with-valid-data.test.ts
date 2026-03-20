import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ModelCarBrand} from "../../../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›created-model-car‹ relationship with valid data', async () => {
    const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)
    const modelCar = await seedNode(DbNodeType.ModelCar)

    const createdRelationship = await ModelCarBrand.createCreatedModelCarRelationship(modelCarBrand.properties.id, modelCar.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(modelCarBrand.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(modelCar.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.ModelCarBrandCreatedModelCar)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
