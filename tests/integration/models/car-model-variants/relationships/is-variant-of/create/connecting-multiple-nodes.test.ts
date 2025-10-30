import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModelVariant} from "../../../../../../../src/models/car-model-variants/CarModelVariant"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A CAR MODEL VARIANT cannot have multiple ›is-variant-of‹ relationships', async () => {
    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
    const carModelsAmount = 3
    const carModels = await seedNodes(NodeTypeEnum.CAR_MODEL, carModelsAmount)

    for (const carModel of carModels) {
        await CarModelVariant.createIsVariantOfRelationship(carModelVariant.id, carModel.id)
    }

    const relationships = await getRelationshipCollection(carModelVariant.id, DbRelationship.CarModelVariantIsVariantOf)

    expect(relationships.length)
        .toBe(1)
})
