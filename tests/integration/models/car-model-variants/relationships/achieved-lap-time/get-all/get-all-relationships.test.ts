import {describe, expect, test} from 'vitest'
import {CarModelVariant} from "../../../../../../../src/models/car-model-variants/CarModelVariant"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›achieved-lap-time‹ relationships', () => {
    test('node and relationships exist', async () => {
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
        await seedRelationshipForStartNode(carModelVariant.id, NodeTypeEnum.LAP_TIME, DbRelationship.CarModelVariantAchievedLapTime)
        await seedRelationshipForStartNode(carModelVariant.id, NodeTypeEnum.LAP_TIME, DbRelationship.CarModelVariantAchievedLapTime)

        const relationships = await CarModelVariant.getAllAchievedLapTimeRelationships(carModelVariant.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

        const relationships = await CarModelVariant.getAllAchievedLapTimeRelationships(carModelVariant.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(CarModelVariant.getAllAchievedLapTimeRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
