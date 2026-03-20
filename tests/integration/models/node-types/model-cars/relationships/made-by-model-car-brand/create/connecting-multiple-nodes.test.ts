import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {ModelCar} from "../../../../../../../../src/models/node-types/model-cars/ModelCar"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A MODEL CAR cannot have multiple ›made-by-model-car-brand‹ relationships', async () => {
    const modelCar = await seedNode(DbNodeType.ModelCar)
    const modelCarBrandsAmount = 3
    const modelCarBrands = await seedNodes(DbNodeType.ModelCarBrand, modelCarBrandsAmount)

    for (const modelCarBrand of modelCarBrands) {
        await ModelCar.createMadeByModelCarBrandRelationship(modelCar.properties.id, modelCarBrand.properties.id)
    }

    const relationships = await getRelationshipCollection(modelCar.properties.id, RelationshipType.ModelCarMadeByModelCarBrand)

    expect(relationships.length)
        .toBe(1)
})
