import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const brand = await seedNode(DbNodeType.Brand)
        await seedRelationshipForStartNode(brand.properties.id, DbNodeType.Image, RelationshipType.BrandHasImage)
        await seedRelationshipForStartNode(brand.properties.id, DbNodeType.Image, RelationshipType.BrandHasImage)

        const relationships = await Brand.getAllHasImageRelationships(brand.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const brand = await seedNode(DbNodeType.Brand)

        const relationships = await Brand.getAllHasImageRelationships(brand.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(Brand.getAllHasImageRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
