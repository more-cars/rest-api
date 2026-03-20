import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ModelCar} from "../../../../../../../../src/models/node-types/model-cars/ModelCar"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-image‹ relationship with nodes that do not exist', async () => {
    const modelCar = await seedNode(DbNodeType.ModelCar)
    const image = await seedNode(DbNodeType.Image)

    await expect(ModelCar.createHasImageRelationship(-42, image.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(ModelCar.createHasImageRelationship(modelCar.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(ModelCar.createHasImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
