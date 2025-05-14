import FakeBrand from "../../../../fixtures/nodes/FakeBrand"
import FakeCarModel from "../../../../fixtures/nodes/FakeCarModel"
import {Brand} from "../../../../../src/models/Brand"
import {CarModel} from "../../../../../src/models/CarModel"
import moment from "moment"

describe('Create Node', () => {
    test('Timestamps are added when creating a node', async () => {
        const createdBrand = await Brand.create(FakeBrand)
        expect(createdBrand)
            .toHaveProperty('created_at')
        expect(moment(createdBrand.created_at).isValid())
            .toEqual(true)
        expect(createdBrand)
            .toHaveProperty('updated_at')
        expect(moment(createdBrand.updated_at).isValid())
            .toEqual(true)

        const createdCarModel = await CarModel.create(FakeCarModel)
        expect(createdCarModel)
            .toHaveProperty('created_at')
        expect(moment(createdCarModel.created_at).isValid())
            .toEqual(true)
        expect(createdCarModel)
            .toHaveProperty('updated_at')
        expect(moment(createdCarModel.updated_at).isValid())
            .toEqual(true)
    })

    test('Timestamps have valid dates', async () => {
        const createdBrand = await Brand.create(FakeBrand)
        expect(moment(createdBrand.created_at).isValid())
        expect(moment(createdBrand.updated_at).isValid())

        const createdCarModel = await CarModel.create(FakeCarModel)
        expect(moment(createdCarModel.created_at).isValid())
        expect(moment(createdCarModel.updated_at).isValid())
    })
})
