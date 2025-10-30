import {describe, expect, test} from "vitest"
import {seedRelationship} from "../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {RacingEvent} from "../../../../../src/models/racing-events/RacingEvent"
import {getRelationshipById} from "../../../../../src/db/relationships/getRelationshipById"

describe('Creating a n:1 relationship', () => {
    test('expecting the destination node to NOT lose its already existing relationship', async () => {
        const foreignRelationship = await seedRelationship(NodeTypeEnum.RACING_EVENT, NodeTypeEnum.RACING_SERIES, DbRelationship.RacingEventBelongsToRacingSeries)
        const destinationId = foreignRelationship.end_node_id
        const originId = (await seedNode(NodeTypeEnum.RACING_EVENT)).id

        const newRelationship = await RacingEvent.createBelongsToRacingSeriesRelationship(originId, destinationId)
        expect(newRelationship.id)
            .not.to.equal(foreignRelationship.relationship_id)
        expect(newRelationship.origin.id)
            .not.to.equal(foreignRelationship.start_node_id)
        expect(newRelationship.destination.id)
            .to.equal(foreignRelationship.end_node_id)

        const refetchedForeignRelationship = await getRelationshipById(foreignRelationship.relationship_id)
        expect(refetchedForeignRelationship)
            .toBeTruthy()
    })
})
