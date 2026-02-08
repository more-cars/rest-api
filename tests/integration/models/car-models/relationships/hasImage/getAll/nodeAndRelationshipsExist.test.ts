import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"

test('CAR MODEL exists and has ›has-image‹ relationships', async () => {
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
    const images = await seedNodes(NodeTypeEnum.IMAGE, 3)

    for (const image of images) {
        await CarModel.createHasImageRelationship(carModel.id, image.id)
    }

    const relationships = await CarModel.getAllHasImageRelationships(carModel.id)

    expect(relationships.length)
        .toBe(3)
})
