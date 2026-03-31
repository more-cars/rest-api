import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting all ›has-video‹ relationships', () => {
    test('node and relationships exist', async () => {
        const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)
        await seedRelationshipForStartNode(modelCarBrand.properties.id, DbNodeType.Video, RelationshipType.ModelCarBrandHasVideo)
        await seedRelationshipForStartNode(modelCarBrand.properties.id, DbNodeType.Video, RelationshipType.ModelCarBrandHasVideo)

        const relationships = await getRelationshipCollection(
            modelCarBrand.properties.id,
            RelationshipType.ModelCarBrandHasVideo,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)

        const relationships = await getRelationshipCollection(
            modelCarBrand.properties.id,
            RelationshipType.ModelCarBrandHasVideo,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.ModelCarBrandHasVideo,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
