import {Brand} from "../../../../../../../src/models/brands/Brand"

test('An error should be returned when the BRAND does not exist', async () => {
    await expect(Brand.getRelationshipsForHasImage(-42))
        .rejects
        .toThrow(Error)
})
