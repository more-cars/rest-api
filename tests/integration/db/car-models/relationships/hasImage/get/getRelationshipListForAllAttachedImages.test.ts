import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {
    getRelationshipsForSpecificNode
} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {seedImages} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImages"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"

test('Requesting a relationship list for all IMAGEs that are connected to the BRAND', async () => {
    const carModel = await seedCarModel()
    const images = await seedImages(3)

    for (const image of images) {
        await createRelationship(
            carModel.id,
            image.id,
            DbRelationship.NodeHasImage,
        )
    }

    const relationships = await getRelationshipsForSpecificNode(
        carModel.id,
        DbRelationship.NodeHasImage,
    )

    expect(relationships.length)
        .toBe(3)
})
