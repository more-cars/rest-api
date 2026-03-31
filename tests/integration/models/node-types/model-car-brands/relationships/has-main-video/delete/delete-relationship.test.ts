import {describe, expect, test} from 'vitest'
import {ModelCarBrand} from "../../../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-main-video‹ relationship', () => {
    test('MODEL CAR BRAND node does not exist', async () => {
        const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)

        await expect(ModelCarBrand.deleteHasMainVideoRelationship(modelCarBrand.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('VIDEO node does not exist', async () => {
        const video = await seedNode(DbNodeType.Video)

        await expect(ModelCarBrand.deleteHasMainVideoRelationship(-42, video.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('MODEL CAR BRAND node and VIDEO node do not exist', async () => {
        await expect(ModelCarBrand.deleteHasMainVideoRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-main-video‹ relationship', async () => {
        const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)
        const video = await seedNode(DbNodeType.Video)

        await expect(ModelCarBrand.deleteHasMainVideoRelationship(modelCarBrand.properties.id, video.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-main-video‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.ModelCarBrand, DbNodeType.Video, RelationshipType.ModelCarBrandHasMainVideo)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ModelCarBrandHasMainVideo,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await ModelCarBrand.deleteHasMainVideoRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.ModelCarBrandHasMainVideo,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
