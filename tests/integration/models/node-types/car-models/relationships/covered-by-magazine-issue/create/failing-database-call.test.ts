import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {CarModel} from "../../../../../../../../src/models/node-types/car-models/CarModel"

vi.mock("../../../../../../../../src/db/relationships/createRelationship", async () => {
    return {
        createRelationship: () => false
    }
})

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    const carModel = await seedNode(DbNodeType.CarModel)
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

    await expect(CarModel.createCoveredByMagazineIssueRelationship(carModel.properties.id, magazineIssue.properties.id))
        .rejects
        .toThrow(Error)
})
