import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {SemanticError} from "../../../../../../../src/models/types/SemanticError"

test('Trying to connect a CAR MODEL to itself', async () => {
    const carModel = await seedNode(DbNodeType.CarModel)

    await expect(CarModel.createHasSuccessorRelationship(carModel.properties.id, carModel.properties.id))
        .rejects
        .toThrow(SemanticError)
})
