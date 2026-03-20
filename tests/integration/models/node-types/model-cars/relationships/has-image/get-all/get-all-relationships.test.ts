import {describe, expect, test} from 'vitest'
import {ModelCar} from "../../../../../../../../src/models/node-types/model-cars/ModelCar"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const modelCar = await seedNode(DbNodeType.ModelCar)
        await seedRelationshipForStartNode(modelCar.properties.id, DbNodeType.Image, RelationshipType.ModelCarHasImage)
        await seedRelationshipForStartNode(modelCar.properties.id, DbNodeType.Image, RelationshipType.ModelCarHasImage)

        const relationships = await ModelCar.getAllHasImageRelationships(modelCar.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const modelCar = await seedNode(DbNodeType.ModelCar)

        const relationships = await ModelCar.getAllHasImageRelationships(modelCar.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(ModelCar.getAllHasImageRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
