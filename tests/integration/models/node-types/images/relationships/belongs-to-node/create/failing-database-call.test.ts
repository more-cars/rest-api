import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Image} from "../../../../../../../../src/models/node-types/images/Image"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const image = await seedNode(DbNodeType.Image)
    const brand = await seedNode(DbNodeType.Brand)

    await expect(Image.createBelongsToNodeRelationship(image.properties.id, brand.properties.id))
        .rejects
        .toThrow(Error)
})
