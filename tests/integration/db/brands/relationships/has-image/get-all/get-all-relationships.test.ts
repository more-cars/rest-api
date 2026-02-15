import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const brand = await seedNode(NodeTypeEnum.BRAND)
        await seedRelationshipForStartNode(brand.id, NodeTypeEnum.IMAGE, DbRelationship.BrandHasImage)
        await seedRelationshipForStartNode(brand.id, NodeTypeEnum.IMAGE, DbRelationship.BrandHasImage)

        const relationships = await getRelationshipCollection(
            brand.id,
            DbRelationship.BrandHasImage,
            NodeTypeLabel.Image,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const brand = await seedNode(NodeTypeEnum.BRAND)

        const relationships = await getRelationshipCollection(
            brand.id,
            DbRelationship.BrandHasImage,
            NodeTypeLabel.Image,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            DbRelationship.BrandHasImage,
            NodeTypeLabel.Image,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
