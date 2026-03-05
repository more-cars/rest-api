import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {CarModel} from "../../../../../../../../src/models/node-types/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›covered-by-magazine-issue‹ relationship with nodes that do not exist', async () => {
    const carModel = await seedNode(DbNodeType.CarModel)
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

    await expect(CarModel.createCoveredByMagazineIssueRelationship(-42, magazineIssue.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModel.createCoveredByMagazineIssueRelationship(carModel.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModel.createCoveredByMagazineIssueRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
