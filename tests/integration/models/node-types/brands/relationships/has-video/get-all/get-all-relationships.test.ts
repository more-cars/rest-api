import {describe, expect, test} from 'vitest'
import {Brand} from "../../../../../../../../src/models/node-types/brands/Brand"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-video‹ relationships', () => {
    test('node and relationships exist', async () => {
        const brand = await seedNode(DbNodeType.Brand)
        await seedRelationshipForStartNode(brand.properties.id, DbNodeType.Video, RelationshipType.BrandHasVideo)
        await seedRelationshipForStartNode(brand.properties.id, DbNodeType.Video, RelationshipType.BrandHasVideo)

        const relationships = await Brand.getAllHasVideoRelationships(brand.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const brand = await seedNode(DbNodeType.Brand)

        const relationships = await Brand.getAllHasVideoRelationships(brand.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(Brand.getAllHasVideoRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
