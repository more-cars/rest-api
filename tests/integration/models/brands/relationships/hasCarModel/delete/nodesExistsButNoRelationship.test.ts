import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

test('Both nodes exist, but have no relationship', async () => {
    const brand = await seedNode('brand')
    const carModel = await seedNode('car model')

    await expect(Brand.deleteHasCarModelRelationship(brand.id, carModel.id))
        .rejects
        .toThrow(RelationshipNotFoundError)
})
