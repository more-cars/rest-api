import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›covers-car-model‹ relationship again', async () => {
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
    const carModel = await seedNode(DbNodeType.CarModel)

    await expect(MagazineIssue.createCoversCarModelRelationship(magazineIssue.properties.id, carModel.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(MagazineIssue.createCoversCarModelRelationship(magazineIssue.properties.id, carModel.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
