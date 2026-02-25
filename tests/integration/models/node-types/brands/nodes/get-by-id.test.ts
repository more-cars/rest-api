import {describe, expect, test} from 'vitest'
import {Brand} from "../../../../../../src/models/node-types/brands/Brand"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Fetching a BRAND', () => {
    test('which does not exist', async () => {
        await expect(Brand.findById(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('which exists', async () => {
        const expectedBrand = await seedNode(DbNodeType.Brand)
        const actualBrand = await Brand.findById(expectedBrand.properties.id)

        expect(actualBrand.attributes)
            .toEqual(expectedBrand.properties)
    })
})
