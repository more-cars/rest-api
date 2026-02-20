import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {Neo4jNodeType} from "../../../../../../../src/db/types/Neo4jNodeType"

describe('Requesting all ›has-car-model‹ relationships', () => {
    test('node and relationships exist', async () => {
        const brand = await seedNode(ControllerNodeType.BRAND)
        await seedRelationshipForStartNode(brand.id, ControllerNodeType.CAR_MODEL, RelationshipType.BrandHasCarModel)
        await seedRelationshipForStartNode(brand.id, ControllerNodeType.CAR_MODEL, RelationshipType.BrandHasCarModel)

        const relationships = await getRelationshipCollection(
            brand.id,
            RelationshipType.BrandHasCarModel,
            Neo4jNodeType.CarModel,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const brand = await seedNode(ControllerNodeType.BRAND)

        const relationships = await getRelationshipCollection(
            brand.id,
            RelationshipType.BrandHasCarModel,
            Neo4jNodeType.CarModel,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.BrandHasCarModel,
            Neo4jNodeType.CarModel,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
