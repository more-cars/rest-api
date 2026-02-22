import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const carModel = await seedNode(DbNodeType.CarModel)
        await seedRelationshipForStartNode(carModel.properties.id, DbNodeType.Image, RelationshipType.CarModelHasImage)
        await seedRelationshipForStartNode(carModel.properties.id, DbNodeType.Image, RelationshipType.CarModelHasImage)

        const relationships = await CarModel.getAllHasImageRelationships(carModel.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const brand = await seedNode(DbNodeType.CarModel)

        const relationships = await CarModel.getAllHasImageRelationships(brand.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(CarModel.getAllHasImageRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
