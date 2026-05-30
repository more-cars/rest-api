import {describe, expect, test, vi} from 'vitest'
import * as wm from "../../../../../src/db/external/wikimedia/performWikimediaApiRequest"
import {FakeGetWikimediaImageByIdResponse} from "../../../../_toolbox/fixtures/external/wikimedia/FakeGetWikimediaImageByIdResponse"
import {Image} from "../../../../../src/models/node-types/images/Image"
import {Brand} from "../../../../../src/models/node-types/brands/Brand"
import {Company} from "../../../../../src/models/node-types/companies/Company"
import {FakeImage} from "../../../../_toolbox/fixtures/nodes/FakeImage"
import {FakeBrand} from "../../../../_toolbox/fixtures/nodes/FakeBrand"
import {FakeCompany} from "../../../../_toolbox/fixtures/nodes/FakeCompany"
import {Node} from "../../../../../src/models/Node"

describe('Fetching the prime images of a node collection', () => {
    test('when the nodes actually have a prime image connected', async () => {
        vi.spyOn(wm, 'performWikimediaApiRequest')
            .mockImplementation(async () => FakeGetWikimediaImageByIdResponse)

        const brand = await Brand.create(FakeBrand.dbInput())
        const brandImage = await Image.create(FakeImage.dbInput())

        const company = await Company.create(FakeCompany.dbInput())
        const companyImage = await Image.create(FakeImage.dbInput())

        await Brand.createHasPrimeImageRelationship(brand.attributes.id, brandImage.attributes.id)
        await Company.createHasPrimeImageRelationship(company.attributes.id, companyImage.attributes.id)

        const result = await Node.findPrimeImages([brand.attributes.id, company.attributes.id])

        const brandImageRel = result.get(brand.attributes.id)
        const companyImageRel = result.get(company.attributes.id)

        expect(brandImageRel?.destination.node_type)
            .toBe(brandImage.node_type)
        expect(companyImageRel?.destination.node_type)
            .toBe(companyImage.node_type)

        expect(brandImageRel?.destination.attributes.id)
            .toBe(brandImage.attributes.id)
        expect(companyImageRel?.destination.attributes.id)
            .toBe(companyImage.attributes.id)
    })
})
