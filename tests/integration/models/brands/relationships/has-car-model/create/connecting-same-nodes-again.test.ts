import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"
import {Brand} from "../../../../../../../src/models/brands/Brand"

test('Trying to create the same ›has-car-model‹ relationship again', async () => {
    const brand = await seedNode(NodeTypeEnum.BRAND)
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

    await expect(Brand.createHasCarModelRelationship(brand.id, carModel.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(Brand.createHasCarModelRelationship(brand.id, carModel.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
