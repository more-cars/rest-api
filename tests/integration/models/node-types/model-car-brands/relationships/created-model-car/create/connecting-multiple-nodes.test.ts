import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {ModelCarBrand} from "../../../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A MODEL CAR BRAND can have multiple ›created-model-car‹ relationships', async () => {
    const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)
    const modelCarsAmount = 3
    const modelCars = await seedNodes(DbNodeType.ModelCar, modelCarsAmount)

    for (const modelCar of modelCars) {
        await ModelCarBrand.createCreatedModelCarRelationship(modelCarBrand.properties.id, modelCar.properties.id)
    }

    const relationships = await getRelationshipCollection(modelCarBrand.properties.id, RelationshipType.ModelCarBrandCreatedModelCar)

    expect(relationships.length)
        .toBe(modelCarsAmount)
})
