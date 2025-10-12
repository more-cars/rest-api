import {describe, expect, test} from 'vitest'
import {Brand} from "../../../../../src/models/brands/Brand"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {seedBrand} from "../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"

describe('Deleting a BRAND', () => {
    test('that does not exist', async () => {
        await expect(Brand.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedBrand()
        await expect(Brand.delete(node.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
