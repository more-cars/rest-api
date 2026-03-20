import {describe, expect, test} from 'vitest'
import {ModelCar} from "../../../../../../../../src/models/node-types/model-cars/ModelCar"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›is-scale-model-of-car-model-variant‹ relationship', () => {
    test('MODEL CAR node does not exist', async () => {
        const modelCar = await seedNode(DbNodeType.ModelCar)

        await expect(ModelCar.deleteIsScaleModelOfCarModelVariantRelationship(modelCar.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL VARIANT node does not exist', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        await expect(ModelCar.deleteIsScaleModelOfCarModelVariantRelationship(-42, carModelVariant.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('MODEL CAR node and CAR MODEL VARIANT node do not exist', async () => {
        await expect(ModelCar.deleteIsScaleModelOfCarModelVariantRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›is-scale-model-of-car-model-variant‹ relationship', async () => {
        const modelCar = await seedNode(DbNodeType.ModelCar)
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        await expect(ModelCar.deleteIsScaleModelOfCarModelVariantRelationship(modelCar.properties.id, carModelVariant.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›is-scale-model-of-car-model-variant‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.ModelCar, DbNodeType.CarModelVariant, RelationshipType.ModelCarIsScaleModelOfCarModelVariant)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ModelCarIsScaleModelOfCarModelVariant,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await ModelCar.deleteIsScaleModelOfCarModelVariantRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ModelCarIsScaleModelOfCarModelVariant,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
