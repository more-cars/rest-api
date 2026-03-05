import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›covers-car-model‹ relationship with nodes that do not exist', async () => {
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
    const carModel = await seedNode(DbNodeType.CarModel)

    await expect(MagazineIssue.createCoversCarModelRelationship(-42, carModel.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(MagazineIssue.createCoversCarModelRelationship(magazineIssue.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(MagazineIssue.createCoversCarModelRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
