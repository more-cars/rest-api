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

        expect(['brand', 'company'].includes(result[0].origin.node_type))
            .toBe(true)
        expect(['brand', 'company'].includes(result[1].origin.node_type))
            .toBe(true)

        expect(result[0].destination.node_type)
            .toEqual('image')
        expect(result[1].destination.node_type)
            .toEqual('image')

        expect([brandImage.attributes.id, companyImage.attributes.id].includes(result[0].destination.attributes.id))
            .toBe(true)

        expect([brandImage.attributes.id, companyImage.attributes.id].includes(result[1].destination.attributes.id))
            .toBe(true)
    })
})
