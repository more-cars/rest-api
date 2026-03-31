import {describe, expect, test} from 'vitest'
import {ModelCarBrand} from "../../../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-video‹ relationships', () => {
    test('node and relationships exist', async () => {
        const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)
        await seedRelationshipForStartNode(modelCarBrand.properties.id, DbNodeType.Video, RelationshipType.ModelCarBrandHasVideo)
        await seedRelationshipForStartNode(modelCarBrand.properties.id, DbNodeType.Video, RelationshipType.ModelCarBrandHasVideo)

        const relationships = await ModelCarBrand.getAllHasVideoRelationships(modelCarBrand.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)

        const relationships = await ModelCarBrand.getAllHasVideoRelationships(modelCarBrand.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(ModelCarBrand.getAllHasVideoRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
