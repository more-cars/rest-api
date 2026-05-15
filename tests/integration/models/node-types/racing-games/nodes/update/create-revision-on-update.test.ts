import {expect, test} from "vitest"
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {FakeRacingGame} from "../../../../../../_toolbox/fixtures/nodes/FakeRacingGame"
import type {RacingGameInput} from "../../../../../../../src/models/node-types/racing-games/types/RacingGameInput"
import {Revision} from "../../../../../../../src/models/node-types/revisions/Revision"

test('Expecting REVISION to be created when updating a node', async () => {
    const node = await RacingGame.create(FakeRacingGame.dbInput())
    await RacingGame.update(node.attributes.id, {} as RacingGameInput)

    const revisionNodes = await Revision.findAll({
        filterByProperty: 'node_updated_at',
        filterValue: node.attributes.updated_at,
    })

    expect(revisionNodes.length)
        .toEqual(1)
})
