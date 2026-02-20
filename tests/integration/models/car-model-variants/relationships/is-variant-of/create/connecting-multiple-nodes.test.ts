import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {Neo4jNodeType} from "../../../../../../../src/db/types/Neo4jNodeType"

test('A CAR MODEL VARIANT cannot have multiple ›is-variant-of‹ relationships', async () => {
    const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)
    const carModelsAmount = 3
    const carModels = await seedNodes(ControllerNodeType.CAR_MODEL, carModelsAmount)

    for (const carModel of carModels) {
        await CarModelVariant.createIsVariantOfRelationship(carModelVariant.id, carModel.id)
    }

    const relationships = await getRelationshipCollection(
        carModelVariant.id,
        RelationshipType.CarModelVariantIsVariantOf,
        Neo4jNodeType.CarModel,
    )

    expect(relationships.length)
        .toBe(1)
})
