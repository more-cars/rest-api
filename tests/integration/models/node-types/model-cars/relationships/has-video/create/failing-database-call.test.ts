import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ModelCar} from "../../../../../../../../src/models/node-types/model-cars/ModelCar"

vi.mock("../../../../../../../../src/db/relationships/createRelationship", async () => {
    return {
        createRelationship: () => false
    }
})

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    const modelCar = await seedNode(DbNodeType.ModelCar)
    const video = await seedNode(DbNodeType.Video)

    await expect(ModelCar.createHasVideoRelationship(modelCar.properties.id, video.properties.id))
        .rejects
        .toThrow(Error)
})
