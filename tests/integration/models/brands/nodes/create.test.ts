import {Brand} from "../../../../../src/models/Brand"
import FakeBrand from "../../../../fixtures/nodes/FakeBrand"

describe('Brand', () => {
    test('When providing valid data the new node can be created', async () => {
        const createdNode = await Brand.create(FakeBrand)

        expect(createdNode)
            .toEqual(expect.objectContaining(FakeBrand))
    })
})
