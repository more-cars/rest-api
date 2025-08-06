import {expect, test, vi} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {Brand} from "../../../../../../../src/models/brands/Brand"

test('A completely valid request, but the database call fails for some reason', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const brand = await seedBrand()
    const image = await seedImage()

    const relationship = await Brand.createHasImageRelationship(brand.id, image.id)

    expect(relationship)
        .toBeFalsy()
})
