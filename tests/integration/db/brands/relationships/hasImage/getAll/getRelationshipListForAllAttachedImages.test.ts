import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

test('Requesting a relationship list for all IMAGEs that are connected to the BRAND', async () => {
    const brand = await seedNode(NodeTypeEnum.BRAND)
    const images = await seedNodes(NodeTypeEnum.IMAGE, 3)

    for (const image of images) {
        await createRelationship(
            brand.id,
            image.id,
            DbRelationship.NodeHasImage,
        )
    }

    const relationships = await getRelationshipCollection(
        brand.id,
        DbRelationship.NodeHasImage,
        NodeTypeLabel.Image,
    )

    expect(relationships.length)
        .toBe(3)
})
