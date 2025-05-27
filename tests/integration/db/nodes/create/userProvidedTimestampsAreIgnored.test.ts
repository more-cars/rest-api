import FakeBrand from "../../../../fixtures/nodes/FakeBrand"
import {BrandNodeUserData} from "../../../../../src/types/brands/BrandNodeUserData"
import {createNode as createBrandNode} from "../../../../../src/db/brands/createNode"
import FakeCarModel from "../../../../fixtures/nodes/FakeCarModel"
import {CarModelNodeUserData} from "../../../../../src/types/car-models/CarModelNodeUserData"
import {createNode as createCarModelNode} from "../../../../../src/db/car-models/createNode"
import FakeImageFull from "../../../../fixtures/nodes/FakeImageFull"
import {ImageNodeUserData} from "../../../../../src/types/images/ImageNodeUserData"
import {ImageNodeGeneratedData} from "../../../../../src/types/images/ImageNodeGeneratedData"
import {createNode as createImageNode} from "../../../../../src/db/images/createNode"

describe('Create Node', () => {
    test('Timestamps provided by the user are ignored', async () => {
        // BRAND
        const brandData: BrandNodeUserData = FakeBrand
        // @ts-expect-error property "created_at" is officially not allowed
        brandData['created_at'] = "blubb"
        // @ts-expect-error property "updated_at" is officially not allowed
        brandData['updated_at'] = "blobb"
        const createdBrand = await createBrandNode(brandData)

        expect(createdBrand).toHaveProperty('created_at')
        expect(createdBrand).not.toHaveProperty('created_at', "blubb")
        expect(createdBrand).toHaveProperty('updated_at')
        expect(createdBrand).not.toHaveProperty('updated_at', "blobb")

        // CAR MODEL
        const carModelData: CarModelNodeUserData = FakeCarModel
        // @ts-expect-error property "created_at" is officially not allowed
        carModelData['created_at'] = "blubb"
        // @ts-expect-error property "updated_at" is officially not allowed
        carModelData['updated_at'] = "blobb"
        const createdCarModel = await createCarModelNode(carModelData)

        expect(createdCarModel).toHaveProperty('created_at')
        expect(createdCarModel).not.toHaveProperty('created_at', "blubb")
        expect(createdCarModel).toHaveProperty('updated_at')
        expect(createdCarModel).not.toHaveProperty('updated_at', "blobb")

        // IMAGE
        const imageData: ImageNodeUserData & ImageNodeGeneratedData = FakeImageFull
        // @ts-expect-error property "created_at" is officially not allowed
        imageData['created_at'] = "blubb"
        // @ts-expect-error property "updated_at" is officially not allowed
        imageData['updated_at'] = "blobb"
        const createdImage = await createImageNode(imageData)

        expect(createdImage).toHaveProperty('created_at')
        expect(createdImage).not.toHaveProperty('created_at', "blubb")
        expect(createdImage).toHaveProperty('updated_at')
        expect(createdImage).not.toHaveProperty('updated_at', "blobb")
    })
})
