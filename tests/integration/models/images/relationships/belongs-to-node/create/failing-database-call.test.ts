import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {Image} from "../../../../../../../src/models/node-types/images/Image"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const image = await seedNode(ControllerNodeType.Image)
    const brand = await seedNode(ControllerNodeType.Brand)

    await expect(Image.createBelongsToNodeRelationship(image.properties.id, brand.properties.id))
        .rejects
        .toThrow(Error)
})
