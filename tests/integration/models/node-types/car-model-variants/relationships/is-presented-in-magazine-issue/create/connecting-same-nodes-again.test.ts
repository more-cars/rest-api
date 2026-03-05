import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›is-presented-in-magazine-issue‹ relationship again', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

    await expect(CarModelVariant.createIsPresentedInMagazineIssueRelationship(carModelVariant.properties.id, magazineIssue.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(CarModelVariant.createIsPresentedInMagazineIssueRelationship(carModelVariant.properties.id, magazineIssue.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
