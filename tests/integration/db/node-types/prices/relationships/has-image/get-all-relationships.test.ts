import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const price = await seedNode(DbNodeType.Price)
        await seedRelationshipForStartNode(price.properties.id, DbNodeType.Image, RelationshipType.PriceHasImage)
        await seedRelationshipForStartNode(price.properties.id, DbNodeType.Image, RelationshipType.PriceHasImage)

        const relationships = await getRelationshipCollection(
            price.properties.id,
            RelationshipType.PriceHasImage,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const price = await seedNode(DbNodeType.Price)

        const relationships = await getRelationshipCollection(
            price.properties.id,
            RelationshipType.PriceHasImage,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.PriceHasImage,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
