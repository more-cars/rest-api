import {CarModel} from "../../../../../src/models/CarModel"
import FakeCarModel from "../../../../fixtures/nodes/FakeCarModel"

describe('Car Model', () => {
    test('When providing valid data the new node can be created', async () => {
        const createdNode = await CarModel.create(FakeCarModel)

        expect(createdNode)
            .toEqual(expect.objectContaining(FakeCarModel))
    })

    test('Read-only properties cannot be overridden', async () => {
        const validData = FakeCarModel
        const readOnlyData = {
            id: 9999,
            created_at: "NOT_ALLOWED_TO_OVERWRITE",
            updated_at: "NOT_ALLOWED_TO_OVERWRITE",
        }
        const data = Object.assign(validData, readOnlyData)
        const createdNode = await CarModel.create(data)

        expect(createdNode)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })
})
