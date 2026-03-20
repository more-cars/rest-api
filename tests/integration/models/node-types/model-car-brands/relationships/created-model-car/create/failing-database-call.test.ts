import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ModelCarBrand} from "../../../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)
    const modelCar = await seedNode(DbNodeType.ModelCar)

    await expect(ModelCarBrand.createCreatedModelCarRelationship(modelCarBrand.properties.id, modelCar.properties.id))
        .rejects
        .toThrow(Error)
})
