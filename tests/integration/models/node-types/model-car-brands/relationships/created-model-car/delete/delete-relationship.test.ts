import {describe, expect, test} from 'vitest'
import {ModelCarBrand} from "../../../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›created-model-car‹ relationship', () => {
    test('MODEL CAR BRAND node does not exist', async () => {
        const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)

        await expect(ModelCarBrand.deleteCreatedModelCarRelationship(modelCarBrand.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('MODEL CAR node does not exist', async () => {
        const modelCar = await seedNode(DbNodeType.ModelCar)

        await expect(ModelCarBrand.deleteCreatedModelCarRelationship(-42, modelCar.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('MODEL CAR BRAND node and MODEL CAR node do not exist', async () => {
        await expect(ModelCarBrand.deleteCreatedModelCarRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›created-model-car‹ relationship', async () => {
        const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)
        const modelCar = await seedNode(DbNodeType.ModelCar)

        await expect(ModelCarBrand.deleteCreatedModelCarRelationship(modelCarBrand.properties.id, modelCar.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›created-model-car‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.ModelCarBrand, DbNodeType.ModelCar, RelationshipType.ModelCarBrandCreatedModelCar)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ModelCarBrandCreatedModelCar,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await ModelCarBrand.deleteCreatedModelCarRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ModelCarBrandCreatedModelCar,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
