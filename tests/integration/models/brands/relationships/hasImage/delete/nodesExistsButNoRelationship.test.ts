import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

test('Both nodes exist, but have no relationship', async () => {
    const brand = await seedNode('brand')
    const image = await seedNode('image')

    await expect(Brand.deleteHasImageRelationship(brand.id, image.id))
        .rejects
        .toThrow(RelationshipNotFoundError)
})
