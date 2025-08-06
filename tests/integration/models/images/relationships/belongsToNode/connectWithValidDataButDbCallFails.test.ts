import {expect, test, vi} from 'vitest'
import {seedImage} from "../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {seedCarModel} from "../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {BaseNode} from "../../../../../../src/db/types/BaseNode"
import {Image} from "../../../../../../src/models/images/Image"

test('A completely valid request, but the database call fails for some reason', async () => {
    vi.mock("../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const image = await seedImage()
    const partnerNode: BaseNode = await seedCarModel()

    const relationship = await Image.createBelongsToNodeRelationship(image.id, partnerNode.id)

    expect(relationship)
        .toBeFalsy()
})
