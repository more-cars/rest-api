import {expect, test} from 'vitest'
import {Brand} from "../../../../../../../src/models/brands/Brand"

test('BRAND does not exist', async () => {
    await expect(Brand.getAllHasCarModelRelationships(-42))
        .rejects
        .toThrow(Error)
})
