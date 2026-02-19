import {describe, expect, test} from "vitest"
import {seedRelationship} from "../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RelationshipType} from "../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {RacingEvent} from "../../../../../src/models/node-types/racing-events/RacingEvent"
import {getRelationshipById} from "../../../../../src/db/relationships/getRelationshipById"

describe('Creating a n:1 relationship', () => {
    test('expecting the destination node to NOT lose its already existing relationship', async () => {
        const foreignRelationship = await seedRelationship(NodeTypeEnum.RACING_EVENT, NodeTypeEnum.RACING_SERIES, RelationshipType.RacingEventBelongsToRacingSeries)
        const destinationId = foreignRelationship.end_node.id
        const originId = (await seedNode(NodeTypeEnum.RACING_EVENT)).id

        const newRelationship = await RacingEvent.createBelongsToRacingSeriesRelationship(originId, destinationId)
        expect(newRelationship.id)
            .not.to.equal(foreignRelationship.id)
        expect(newRelationship.origin.id)
            .not.to.equal(foreignRelationship.start_node.id)
        expect(newRelationship.destination.id)
            .to.equal(foreignRelationship.end_node.id)

        const refetchedForeignRelationship = await getRelationshipById(foreignRelationship.id)
        expect(refetchedForeignRelationship)
            .toBeTruthy()
    })
})
