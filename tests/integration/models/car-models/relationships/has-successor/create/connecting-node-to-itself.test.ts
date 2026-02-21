import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {SemanticError} from "../../../../../../../src/models/types/SemanticError"

test('Trying to connect a CAR MODEL to itself', async () => {
    const carModel = await seedNode(ControllerNodeType.CarModel)

    await expect(CarModel.createHasSuccessorRelationship(carModel.properties.id, carModel.properties.id))
        .rejects
        .toThrow(SemanticError)
})
