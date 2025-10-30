import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Expecting an empty list when the relationship does not exist', async () => {
    const image = await seedNode(NodeTypeEnum.IMAGE)
    const partnerNode = await seedNode(NodeTypeEnum.COMPANY)

    const relationship = await deleteSpecificRelationship(
        image.id,
        partnerNode.id,
        DbRelationship.ImageBelongsToNode,
    )

    expect(relationship)
        .toBeFalsy()
})
