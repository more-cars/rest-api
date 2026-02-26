import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const magazine = await seedNode(DbNodeType.Magazine)
        await seedRelationshipForStartNode(magazine.properties.id, DbNodeType.Image, RelationshipType.MagazineHasImage)
        await seedRelationshipForStartNode(magazine.properties.id, DbNodeType.Image, RelationshipType.MagazineHasImage)

        const relationships = await getRelationshipCollection(
            magazine.properties.id,
            RelationshipType.MagazineHasImage,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const magazine = await seedNode(DbNodeType.Magazine)

        const relationships = await getRelationshipCollection(
            magazine.properties.id,
            RelationshipType.MagazineHasImage,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.MagazineHasImage,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
