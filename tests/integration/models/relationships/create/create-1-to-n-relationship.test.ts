import {describe, expect, test} from "vitest"
import {seedRelationship} from "../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RelationshipType} from "../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {Brand} from "../../../../../src/models/node-types/brands/Brand"
import {getRelationshipById} from "../../../../../src/db/relationships/getRelationshipById"

describe('Creating a 1:n relationship', () => {
    test('expecting the destination node to lose its already existing relationship', async () => {
        const foreignRelationship = await seedRelationship(NodeTypeEnum.BRAND, NodeTypeEnum.CAR_MODEL, RelationshipType.BrandHasCarModel)
        const destinationId = foreignRelationship.end_node_id
        const originId = (await seedNode(NodeTypeEnum.BRAND)).id

        const newRelationship = await Brand.createHasCarModelRelationship(originId, destinationId)
        expect(newRelationship.id)
            .not.to.equal(foreignRelationship.id)
        expect(newRelationship.origin.id)
            .not.to.equal(foreignRelationship.start_node.id)
        expect(newRelationship.destination.id)
            .to.equal(foreignRelationship.end_node_id)

        const refetchedForeignRelationship = await getRelationshipById(foreignRelationship.id)
        expect(refetchedForeignRelationship)
            .toBeFalsy()
    })
})
