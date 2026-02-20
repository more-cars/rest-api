import {describe, expect, test} from 'vitest'
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›achieved-session-result‹ relationships', () => {
    test('node and relationships exist', async () => {
        const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)
        await seedRelationshipForStartNode(carModelVariant.id, ControllerNodeType.SESSION_RESULT, RelationshipType.CarModelVariantAchievedSessionResult)
        await seedRelationshipForStartNode(carModelVariant.id, ControllerNodeType.SESSION_RESULT, RelationshipType.CarModelVariantAchievedSessionResult)

        const relationships = await CarModelVariant.getAllAchievedSessionResultRelationships(carModelVariant.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)

        const relationships = await CarModelVariant.getAllAchievedSessionResultRelationships(carModelVariant.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(CarModelVariant.getAllAchievedSessionResultRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
