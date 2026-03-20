import {describe, expect, test} from 'vitest'
import {ModelCar} from "../../../../../../../../src/models/node-types/model-cars/ModelCar"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-prime-image‹ relationship', () => {
    test('MODEL CAR node does not exist', async () => {
        const modelCar = await seedNode(DbNodeType.ModelCar)

        await expect(ModelCar.deleteHasPrimeImageRelationship(modelCar.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const image = await seedNode(DbNodeType.Image)

        await expect(ModelCar.deleteHasPrimeImageRelationship(-42, image.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('MODEL CAR node and IMAGE node do not exist', async () => {
        await expect(ModelCar.deleteHasPrimeImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-prime-image‹ relationship', async () => {
        const modelCar = await seedNode(DbNodeType.ModelCar)
        const image = await seedNode(DbNodeType.Image)

        await expect(ModelCar.deleteHasPrimeImageRelationship(modelCar.properties.id, image.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-prime-image‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.ModelCar, DbNodeType.Image, RelationshipType.ModelCarHasPrimeImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ModelCarHasPrimeImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await ModelCar.deleteHasPrimeImageRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ModelCarHasPrimeImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
