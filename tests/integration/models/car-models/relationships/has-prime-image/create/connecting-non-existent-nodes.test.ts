import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-prime-image‹ relationship with nodes that do not exist', async () => {
    const carModel = await seedNode(DbNodeType.CarModel)
    const image = await seedNode(DbNodeType.Image)

    await expect(CarModel.createHasPrimeImageRelationship(-42, image.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModel.createHasPrimeImageRelationship(carModel.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModel.createHasPrimeImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
