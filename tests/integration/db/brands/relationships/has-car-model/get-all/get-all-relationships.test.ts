import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

describe('Requesting all ›has-car-model‹ relationships', () => {
    test('node and relationships exist', async () => {
        const brand = await seedNode(NodeTypeEnum.BRAND)
        await seedRelationshipForStartNode(brand.id, NodeTypeEnum.CAR_MODEL, DbRelationship.BrandHasCarModel)
        await seedRelationshipForStartNode(brand.id, NodeTypeEnum.CAR_MODEL, DbRelationship.BrandHasCarModel)

        const relationships = await getRelationshipCollection(
            brand.id,
            DbRelationship.BrandHasCarModel,
            NodeTypeLabel.CarModel,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const brand = await seedNode(NodeTypeEnum.BRAND)

        const relationships = await getRelationshipCollection(
            brand.id,
            DbRelationship.BrandHasCarModel,
            NodeTypeLabel.CarModel,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            DbRelationship.BrandHasCarModel,
            NodeTypeLabel.CarModel,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
