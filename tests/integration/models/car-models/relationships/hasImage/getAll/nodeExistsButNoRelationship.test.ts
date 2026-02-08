import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"

test('CAR MODEL exists, but has no ›has-image‹ relationships', async () => {
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

    const relationships = await CarModel.getAllHasImageRelationships(carModel.id)

    expect(relationships.length)
        .toBe(0)
})
