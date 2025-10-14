import {expect, test, vi} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {Brand} from "../../../../../../../src/models/brands/Brand"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const brand = await seedBrand()
    const image = await seedImage()

    await expect(Brand.createHasPrimeImageRelationship(brand.id, image.id))
        .rejects
        .toThrow(Error)
})
