import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('Attaching the car model to another brand removes the original relationship', async () => {
    const firstBrand = await seedNode(NodeTypeEnum.BRAND)
    const secondBrand = await seedNode(NodeTypeEnum.BRAND)
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

    await Brand.createHasCarModelRelationship(firstBrand.id, carModel.id)
    const originalRelationship = await getSpecificRelationship(
        firstBrand.id,
        carModel.id,
        DbRelationship.BrandHasCarModel,
    )
    expect(originalRelationship).not.toBeFalsy()

    await Brand.createHasCarModelRelationship(secondBrand.id, carModel.id)
    const newRelationship = await getSpecificRelationship(
        secondBrand.id,
        carModel.id,
        DbRelationship.BrandHasCarModel,
    )
    expect(newRelationship).not.toBeFalsy()

    const refetchedOriginalRelationship = await getSpecificRelationship(
        firstBrand.id,
        carModel.id,
        DbRelationship.BrandHasCarModel,
    )
    expect(refetchedOriginalRelationship).toBeFalsy()
})
