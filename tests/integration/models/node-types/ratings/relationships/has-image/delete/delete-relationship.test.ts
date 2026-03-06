import {describe, expect, test} from 'vitest'
import {Rating} from "../../../../../../../../src/models/node-types/ratings/Rating"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-image‹ relationship', () => {
    test('RATING node does not exist', async () => {
        const rating = await seedNode(DbNodeType.Rating)

        await expect(Rating.deleteHasImageRelationship(rating.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const image = await seedNode(DbNodeType.Image)

        await expect(Rating.deleteHasImageRelationship(-42, image.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RATING node and IMAGE node do not exist', async () => {
        await expect(Rating.deleteHasImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-image‹ relationship', async () => {
        const rating = await seedNode(DbNodeType.Rating)
        const image = await seedNode(DbNodeType.Image)

        await expect(Rating.deleteHasImageRelationship(rating.properties.id, image.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-image‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.Rating, DbNodeType.Image, RelationshipType.RatingHasImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RatingHasImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await Rating.deleteHasImageRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RatingHasImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
