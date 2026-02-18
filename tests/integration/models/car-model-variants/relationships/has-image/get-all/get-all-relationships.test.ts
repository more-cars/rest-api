import {describe, expect, test} from 'vitest'
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
        await seedRelationshipForStartNode(carModelVariant.id, NodeTypeEnum.IMAGE, RelationshipType.CarModelVariantHasImage)
        await seedRelationshipForStartNode(carModelVariant.id, NodeTypeEnum.IMAGE, RelationshipType.CarModelVariantHasImage)

        const relationships = await CarModelVariant.getAllHasImageRelationships(carModelVariant.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

        const relationships = await CarModelVariant.getAllHasImageRelationships(carModelVariant.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(CarModelVariant.getAllHasImageRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
