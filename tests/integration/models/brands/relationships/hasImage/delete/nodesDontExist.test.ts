import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Brand does not exist', async () => {
    const brand = await seedNode('brand')

    await expect(Brand.deleteHasImageRelationship(brand.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)
})

test('Image does not exist', async () => {
    const image = await seedNode('brand')

    await expect(Brand.deleteHasImageRelationship(-42, image.id))
        .rejects
        .toThrow(NodeNotFoundError)
})

test('Both nodes do not exist', async () => {
    await expect(Brand.deleteHasImageRelationship(-42, -43))
        .rejects
        .toThrow(NodeNotFoundError)
})