import {expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Both nodes and the relationship exist', async () => {
    const seededRelationship = await seedRelationship(NodeTypeEnum.BRAND, NodeTypeEnum.CAR_MODEL, DbRelationship.BrandHasCarModel)

    const relationshipBefore = await getSpecificRelationship(
        seededRelationship.start_node_id,
        seededRelationship.end_node_id,
        DbRelationship.BrandHasCarModel,
    )

    expect(relationshipBefore)
        .toBeTruthy()

    await Brand.deleteHasCarModelRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

    const relationshipAfter = await getSpecificRelationship(
        seededRelationship.start_node_id,
        seededRelationship.end_node_id,
        DbRelationship.BrandHasCarModel,
    )

    expect(relationshipAfter)
        .toBeFalsy()
})
