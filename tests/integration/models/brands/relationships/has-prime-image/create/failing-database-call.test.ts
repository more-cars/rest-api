import {expect, test, vi} from 'vitest'
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const brand = await seedNode(ControllerNodeType.Brand)
    const image = await seedNode(ControllerNodeType.Image)

    await expect(Brand.createHasPrimeImageRelationship(brand.properties.id, image.properties.id))
        .rejects
        .toThrow(Error)
})
