import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
        await seedRelationshipForStartNode(carModel.id, NodeTypeEnum.IMAGE, DbRelationship.CarModelHasImage)
        await seedRelationshipForStartNode(carModel.id, NodeTypeEnum.IMAGE, DbRelationship.CarModelHasImage)

        const relationships = await CarModel.getAllHasImageRelationships(carModel.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const brand = await seedNode(NodeTypeEnum.CAR_MODEL)

        const relationships = await CarModel.getAllHasImageRelationships(brand.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(CarModel.getAllHasImageRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
