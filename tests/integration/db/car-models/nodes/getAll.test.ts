import {deleteAllCarModels} from "../../../../dbSeeding/car-models/nodes/deleteAllCarModels"
import {CarModelNode} from "../../../../../src/types/car-models/CarModelNode"
import {seedCarModels} from "../../../../dbSeeding/car-models/nodes/seedCarModels"
import {getAllNodesOfType} from "../../../../../src/db/car-models/getAllNodesOfType"

describe('Car Model', () => {
    test('When there are no car models then an empty array should be returned', async () => {
        await deleteAllCarModels()

        const expectedCarModels: Array<CarModelNode> = []
        const actualCarModels = await getAllNodesOfType()

        expect(actualCarModels)
            .toEqual(expectedCarModels)
    })

    test('When brands exist then all of them should be returned', async () => {
        await deleteAllCarModels()
        const amount = Math.ceil(Math.random() * 50)
        await seedCarModels(amount)

        const actualCarModels = await getAllNodesOfType()

        expect(actualCarModels.length)
            .toEqual(amount)
    })
})
