import {CarModel} from "../../../../../src/models/CarModel"
import FakeCarModel from "../../../../fixtures/nodes/FakeCarModel"

describe('Car Model', () => {
    test('When providing valid data the new node can be created', async () => {
        const createdNode = await CarModel.create(FakeCarModel)

        expect(createdNode)
            .toEqual(expect.objectContaining(FakeCarModel))
    })
})
