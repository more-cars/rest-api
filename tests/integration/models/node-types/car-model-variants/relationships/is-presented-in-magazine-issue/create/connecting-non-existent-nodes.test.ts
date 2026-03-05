import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›is-presented-in-magazine-issue‹ relationship with nodes that do not exist', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

    await expect(CarModelVariant.createIsPresentedInMagazineIssueRelationship(-42, magazineIssue.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModelVariant.createIsPresentedInMagazineIssueRelationship(carModelVariant.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModelVariant.createIsPresentedInMagazineIssueRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
