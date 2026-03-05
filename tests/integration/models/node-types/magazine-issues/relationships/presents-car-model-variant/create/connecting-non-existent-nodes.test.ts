import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›presents-car-model-variant‹ relationship with nodes that do not exist', async () => {
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

    await expect(MagazineIssue.createPresentsCarModelVariantRelationship(-42, carModelVariant.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(MagazineIssue.createPresentsCarModelVariantRelationship(magazineIssue.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(MagazineIssue.createPresentsCarModelVariantRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
