import {Brand} from "../../../../../src/models/brands/Brand"
import FakeBrand from "../../../../fixtures/nodes/FakeBrand"

test('When providing valid data the new node can be created', async () => {
    const createdNode = await Brand.create(FakeBrand)

    expect(createdNode)
        .toEqual(expect.objectContaining(FakeBrand))
})

test('Read-only properties cannot be overridden', async () => {
    const validData = FakeBrand
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await Brand.create(data)

    expect(createdNode)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
