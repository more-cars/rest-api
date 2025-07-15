import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {
    getRelationshipsForSpecificNode
} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {seedImages} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImages"

test('Requesting a relationship list for all IMAGEs that are connected to the BRAND', async () => {
    const brand = await seedBrand()
    const images = await seedImages(3)

    for (const image of images) {
        await createRelationship(
            brand.id,
            image.id,
            DbRelationship.NodeHasImage,
        )
    }

    const relationships = await getRelationshipsForSpecificNode(
        brand.id,
        DbRelationship.NodeHasImage,
    )

    expect(relationships.length)
        .toBe(3)
})
