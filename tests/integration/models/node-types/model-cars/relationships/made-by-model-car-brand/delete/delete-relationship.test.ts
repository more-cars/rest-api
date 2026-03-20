import {describe, expect, test} from 'vitest'
import {ModelCar} from "../../../../../../../../src/models/node-types/model-cars/ModelCar"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›made-by-model-car-brand‹ relationship', () => {
    test('MODEL CAR node does not exist', async () => {
        const modelCar = await seedNode(DbNodeType.ModelCar)

        await expect(ModelCar.deleteMadeByModelCarBrandRelationship(modelCar.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('MODEL CAR BRAND node does not exist', async () => {
        const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)

        await expect(ModelCar.deleteMadeByModelCarBrandRelationship(-42, modelCarBrand.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('MODEL CAR node and MODEL CAR BRAND node do not exist', async () => {
        await expect(ModelCar.deleteMadeByModelCarBrandRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›made-by-model-car-brand‹ relationship', async () => {
        const modelCar = await seedNode(DbNodeType.ModelCar)
        const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)

        await expect(ModelCar.deleteMadeByModelCarBrandRelationship(modelCar.properties.id, modelCarBrand.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›made-by-model-car-brand‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.ModelCar, DbNodeType.ModelCarBrand, RelationshipType.ModelCarMadeByModelCarBrand)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ModelCarMadeByModelCarBrand,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await ModelCar.deleteMadeByModelCarBrandRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ModelCarMadeByModelCarBrand,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
