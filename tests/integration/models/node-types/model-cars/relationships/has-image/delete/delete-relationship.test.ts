import {describe, expect, test} from 'vitest'
import {ModelCar} from "../../../../../../../../src/models/node-types/model-cars/ModelCar"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-image‹ relationship', () => {
    test('MODEL CAR node does not exist', async () => {
        const modelCar = await seedNode(DbNodeType.ModelCar)

        await expect(ModelCar.deleteHasImageRelationship(modelCar.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const image = await seedNode(DbNodeType.Image)

        await expect(ModelCar.deleteHasImageRelationship(-42, image.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('MODEL CAR node and IMAGE node do not exist', async () => {
        await expect(ModelCar.deleteHasImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-image‹ relationship', async () => {
        const modelCar = await seedNode(DbNodeType.ModelCar)
        const image = await seedNode(DbNodeType.Image)

        await expect(ModelCar.deleteHasImageRelationship(modelCar.properties.id, image.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-image‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.ModelCar, DbNodeType.Image, RelationshipType.ModelCarHasImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ModelCarHasImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await ModelCar.deleteHasImageRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ModelCarHasImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
