import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const brand = await seedNode(DbNodeType.Brand)
    const carModel = await seedNode(DbNodeType.CarModel)

    await expect(Brand.createHasCarModelRelationship(brand.properties.id, carModel.properties.id))
        .rejects
        .toThrow(Error)
})
