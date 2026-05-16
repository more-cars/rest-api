import {expect, test} from "vitest"
import {Rating} from "../../../../../../../src/models/node-types/ratings/Rating"
import {FakeRating} from "../../../../../../_toolbox/fixtures/nodes/FakeRating"
import type {RatingInput} from "../../../../../../../src/models/node-types/ratings/types/RatingInput"
import {Revision} from "../../../../../../../src/models/node-types/revisions/Revision"

test('Expecting REVISION to be created when updating a node', async () => {
    const node = await Rating.create(FakeRating.dbInput())
    await Rating.update(node.attributes.id, {} as RatingInput)

    const revisionNodes = await Revision.findAll({
        filterByProperty: 'node_updated_at',
        filterValue: node.attributes.updated_at,
    })

    expect(revisionNodes.length)
        .toEqual(1)
})
