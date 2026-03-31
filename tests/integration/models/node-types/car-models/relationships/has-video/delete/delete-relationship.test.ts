import {describe, expect, test} from 'vitest'
import {CarModel} from "../../../../../../../../src/models/node-types/car-models/CarModel"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-video‹ relationship', () => {
    test('CAR MODEL node does not exist', async () => {
        const carModel = await seedNode(DbNodeType.CarModel)

        await expect(CarModel.deleteHasVideoRelationship(carModel.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('VIDEO node does not exist', async () => {
        const video = await seedNode(DbNodeType.Video)

        await expect(CarModel.deleteHasVideoRelationship(-42, video.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL node and VIDEO node do not exist', async () => {
        await expect(CarModel.deleteHasVideoRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-video‹ relationship', async () => {
        const carModel = await seedNode(DbNodeType.CarModel)
        const video = await seedNode(DbNodeType.Video)

        await expect(CarModel.deleteHasVideoRelationship(carModel.properties.id, video.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-video‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.CarModel, DbNodeType.Video, RelationshipType.CarModelHasVideo)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelHasVideo,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await CarModel.deleteHasVideoRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelHasVideo,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
