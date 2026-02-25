import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A CAR MODEL VARIANT cannot have multiple ›is-variant-of‹ relationships', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const carModelsAmount = 3
    const carModels = await seedNodes(DbNodeType.CarModel, carModelsAmount)

    for (const carModel of carModels) {
        await CarModelVariant.createIsVariantOfRelationship(carModelVariant.properties.id, carModel.properties.id)
    }

    const relationships = await getRelationshipCollection(
        carModelVariant.properties.id,
        RelationshipType.CarModelVariantIsVariantOf,
        DbNodeType.CarModel,
    )

    expect(relationships.length)
        .toBe(1)
})
