import {expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {Image} from "../../../../../../../src/models/images/Image"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Both nodes and the relationship exist', async () => {
    const seededRelationship = await seedRelationship(NodeTypeEnum.IMAGE, NodeTypeEnum.COMPANY, DbRelationship.ImageBelongsToCompany)

    const relationshipBefore = await getSpecificRelationship(
        seededRelationship.start_node_id,
        seededRelationship.end_node_id,
        DbRelationship.ImageBelongsToCompany,
    )

    expect(relationshipBefore)
        .toBeTruthy()

    await Image.deleteBelongsToNodeRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

    const relationshipAfter = await getSpecificRelationship(
        seededRelationship.start_node_id,
        seededRelationship.end_node_id,
        DbRelationship.ImageBelongsToCompany,
    )

    expect(relationshipAfter)
        .toBeFalsy()
})
