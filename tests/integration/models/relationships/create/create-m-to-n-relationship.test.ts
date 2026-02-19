import {describe, expect, test} from "vitest"
import {seedRelationship} from "../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RelationshipType} from "../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {Company} from "../../../../../src/models/node-types/companies/Company"
import {getRelationshipById} from "../../../../../src/db/relationships/getRelationshipById"

describe('Creating a m:n relationship', () => {
    test('expecting the destination node to NOT lose its already existing relationship', async () => {
        const foreignRelationship = await seedRelationship(NodeTypeEnum.COMPANY, NodeTypeEnum.IMAGE, RelationshipType.CompanyHasImage)
        const destinationId = foreignRelationship.end_node_id
        const originId = (await seedNode(NodeTypeEnum.COMPANY)).id

        const newRelationship = await Company.createHasImageRelationship(originId, destinationId)
        expect(newRelationship.id)
            .not.to.equal(foreignRelationship.id)
        expect(newRelationship.origin.id)
            .not.to.equal(foreignRelationship.start_node.id)
        expect(newRelationship.destination.id)
            .to.equal(foreignRelationship.end_node_id)

        const refetchedForeignRelationship = await getRelationshipById(foreignRelationship.id)
        expect(refetchedForeignRelationship)
            .toBeTruthy()
    })
})
