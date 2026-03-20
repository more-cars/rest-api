import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {ModelCar} from "../../../../../../../../src/models/node-types/model-cars/ModelCar"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A MODEL CAR cannot have multiple ›is-scale-model-of-car-model-variant‹ relationships', async () => {
    const modelCar = await seedNode(DbNodeType.ModelCar)
    const carModelVariantsAmount = 3
    const carModelVariants = await seedNodes(DbNodeType.CarModelVariant, carModelVariantsAmount)

    for (const carModelVariant of carModelVariants) {
        await ModelCar.createIsScaleModelOfCarModelVariantRelationship(modelCar.properties.id, carModelVariant.properties.id)
    }

    const relationships = await getRelationshipCollection(modelCar.properties.id, RelationshipType.ModelCarIsScaleModelOfCarModelVariant)

    expect(relationships.length)
        .toBe(1)
})
