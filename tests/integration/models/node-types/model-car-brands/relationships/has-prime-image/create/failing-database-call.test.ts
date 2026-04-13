import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ModelCarBrand} from "../../../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"

vi.mock("../../../../../../../../src/db/relationships/createRelationship", async () => {
    return {
        createRelationship: () => false
    }
})

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)
    const image = await seedNode(DbNodeType.Image)

    await expect(ModelCarBrand.createHasPrimeImageRelationship(modelCarBrand.properties.id, image.properties.id))
        .rejects
        .toThrow(Error)
})
