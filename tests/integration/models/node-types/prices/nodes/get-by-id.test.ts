import {describe, expect, test} from 'vitest'
import {Price} from "../../../../../../src/models/node-types/prices/Price"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Fetching a PRICE', () => {
    test('which does not exist', async () => {
        await expect(Price.findById(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('which exists', async () => {
        const expectedPrice = await seedNode(DbNodeType.Price)
        const actualPrice = await Price.findById(expectedPrice.properties.id)

        expect(actualPrice.attributes)
            .toEqual(expectedPrice.properties)
    })
})
