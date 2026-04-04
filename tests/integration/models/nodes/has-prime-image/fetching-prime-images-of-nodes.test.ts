import {describe, expect, test} from 'vitest'
import {Brand} from "../../../../../src/models/node-types/brands/Brand"
import {Company} from "../../../../../src/models/node-types/companies/Company"
import {Image} from "../../../../../src/models/node-types/images/Image"
import {Node} from "../../../../../src/models/Node"
import {FakeBrand} from "../../../../_toolbox/fixtures/nodes/FakeBrand"
import {FakeCompany} from "../../../../_toolbox/fixtures/nodes/FakeCompany"
import {FakeImage} from "../../../../_toolbox/fixtures/nodes/FakeImage"

describe('Fetching the prime images of a node collection', () => {
    test('when the nodes actually have a prime image connected', async () => {
        const brand = await Brand.create(FakeBrand.dbInput)
        const brandImage = await Image.create(FakeImage.dbInput)
        const company = await Company.create(FakeCompany.dbInput)
        const companyImage = await Image.create(FakeImage.dbInput)

        await Brand.createHasPrimeImageRelationship(brand.attributes.id, brandImage.attributes.id)
        await Company.createHasPrimeImageRelationship(company.attributes.id, companyImage.attributes.id)

        const result = await Node.findPrimeImages([brand.attributes.id, company.attributes.id])

        expect(result[0].destination.node_type)
            .toEqual('image')

        expect(result[0].destination.attributes.id)
            .toEqual(brandImage.attributes.id)

        expect(result[1].destination.node_type)
            .toEqual('image')

        expect(result[1].destination.attributes.id)
            .toEqual(companyImage.attributes.id)
    })
})
