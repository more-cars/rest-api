import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A CAR MODEL VARIANT can have multiple ›has-scale-model‹ relationships', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const modelCarsAmount = 3
    const modelCars = await seedNodes(DbNodeType.ModelCar, modelCarsAmount)

    for (const modelCar of modelCars) {
        await CarModelVariant.createHasScaleModelRelationship(carModelVariant.properties.id, modelCar.properties.id)
    }

    const relationships = await getRelationshipCollection(carModelVariant.properties.id, RelationshipType.CarModelVariantHasScaleModel)

    expect(relationships.length)
        .toBe(modelCarsAmount)
})
