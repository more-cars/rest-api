import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"

describe('Requesting all ›has-car-model‹ relationships', () => {
    test('node and relationships exist', async () => {
        const brand = await seedNode(ControllerNodeType.BRAND)
        await seedRelationshipForStartNode(brand.properties.id, ControllerNodeType.CAR_MODEL, RelationshipType.BrandHasCarModel)
        await seedRelationshipForStartNode(brand.properties.id, ControllerNodeType.CAR_MODEL, RelationshipType.BrandHasCarModel)

        const relationships = await Brand.getAllHasCarModelRelationships(brand.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const brand = await seedNode(ControllerNodeType.BRAND)

        const relationships = await Brand.getAllHasCarModelRelationships(brand.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(Brand.getAllHasCarModelRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
