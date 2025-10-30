import {describe, expect, test} from 'vitest'
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-variant‹ relationships', () => {
    test('node and relationships exist', async () => {
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
        await seedRelationshipForStartNode(carModel.id, NodeTypeEnum.CAR_MODEL_VARIANT, DbRelationship.CarModelHasVariant)
        await seedRelationshipForStartNode(carModel.id, NodeTypeEnum.CAR_MODEL_VARIANT, DbRelationship.CarModelHasVariant)

        const relationships = await CarModel.getAllHasVariantRelationships(carModel.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

        const relationships = await CarModel.getAllHasVariantRelationships(carModel.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(CarModel.getAllHasVariantRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
