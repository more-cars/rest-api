import {describe, expect, test} from "vitest"
import {seedRelationship} from "../../../../_toolbox/dbSeeding/seedRelationship"
import {RelationshipType} from "../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {Company} from "../../../../../src/models/node-types/companies/Company"
import {getRelationshipById} from "../../../../../src/db/relationships/getRelationshipById"

describe('Creating a m:n relationship', () => {
    test('expecting the destination node to NOT lose its already existing relationship', async () => {
        const foreignRelationship = await seedRelationship(DbNodeType.Company, DbNodeType.Image, RelationshipType.CompanyHasImage)
        const destinationId = foreignRelationship.end_node.properties.id
        const originId = (await seedNode(DbNodeType.Company)).properties.id

        const newRelationship = await Company.createHasImageRelationship(originId, destinationId)
        expect(newRelationship.id)
            .not.to.equal(foreignRelationship.id)
        expect(newRelationship.origin.attributes.id)
            .not.to.equal(foreignRelationship.start_node.properties.id)
        expect(newRelationship.destination.attributes.id)
            .to.equal(foreignRelationship.end_node.properties.id)

        const refetchedForeignRelationship = await getRelationshipById(foreignRelationship.id)
        expect(refetchedForeignRelationship)
            .toBeTruthy()
    })
})
