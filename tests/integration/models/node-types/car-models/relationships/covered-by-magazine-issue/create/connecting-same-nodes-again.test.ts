import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {CarModel} from "../../../../../../../../src/models/node-types/car-models/CarModel"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›covered-by-magazine-issue‹ relationship again', async () => {
    const carModel = await seedNode(DbNodeType.CarModel)
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

    await expect(CarModel.createCoveredByMagazineIssueRelationship(carModel.properties.id, magazineIssue.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(CarModel.createCoveredByMagazineIssueRelationship(carModel.properties.id, magazineIssue.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
