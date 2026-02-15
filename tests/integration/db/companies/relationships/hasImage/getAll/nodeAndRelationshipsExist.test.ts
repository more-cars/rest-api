import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

test('Node and relationships exist', async () => {
    const company = await seedNode(NodeTypeEnum.COMPANY)
    await seedRelationshipForStartNode(company.id, NodeTypeEnum.IMAGE, DbRelationship.CompanyHasImage)
    await seedRelationshipForStartNode(company.id, NodeTypeEnum.IMAGE, DbRelationship.CompanyHasImage)

    const relationships = await getRelationshipCollection(
        company.id,
        DbRelationship.CompanyHasImage,
        NodeTypeLabel.Image,
    )

    expect(relationships.length)
        .toBe(2)
})