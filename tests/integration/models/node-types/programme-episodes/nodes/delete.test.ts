import {describe, expect, test} from 'vitest'
import {ProgrammeEpisode} from "../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Deleting a PROGRAMME EPISODE', () => {
    test('that does not exist', async () => {
        await expect(ProgrammeEpisode.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(DbNodeType.ProgrammeEpisode)
        await expect(ProgrammeEpisode.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
