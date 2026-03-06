import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const rating = await seedNode(DbNodeType.Rating)
        await seedRelationshipForStartNode(rating.properties.id, DbNodeType.Image, RelationshipType.RatingHasImage)
        await seedRelationshipForStartNode(rating.properties.id, DbNodeType.Image, RelationshipType.RatingHasImage)

        const relationships = await getRelationshipCollection(
            rating.properties.id,
            RelationshipType.RatingHasImage,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const rating = await seedNode(DbNodeType.Rating)

        const relationships = await getRelationshipCollection(
            rating.properties.id,
            RelationshipType.RatingHasImage,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.RatingHasImage,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
