import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›belongs-to-brand‹ relationship again', async () => {
    const carModel = await seedNode(ControllerNodeType.CAR_MODEL)
    const brand = await seedNode(ControllerNodeType.BRAND)

    await expect(CarModel.createBelongsToBrandRelationship(carModel.id, brand.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(CarModel.createBelongsToBrandRelationship(carModel.id, brand.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
