import {expect, test} from 'vitest'
import {Brand} from "../../../../../../../src/models/brands/Brand"

// Opposite to the counterpart test on the database layer, here we expect an error, not an empty list.
// On the application layer the models perform semantical checks, on the database only syntactical ones.
// If the brand does not exist it should be detected and return an error.
test('An error should be returned when the BRAND does not exist', async () => {
    await expect(Brand.getAllHasCarModelRelationships(-42))
        .rejects
        .toThrow(Error)
})
