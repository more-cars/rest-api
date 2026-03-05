import {describe, expect, test} from "vitest"
import {getAllDbNodeTypes} from "../../../../_toolbox/getAllDbNodeTypes"
import {fetchNodeCountByNodeType} from "../../../../../src/db/nodes/fetchNodeCountByNodeType"
import {seedNodes} from "../../../../_toolbox/dbSeeding/seedNodes"

describe('get total amount of nodes', () => {
    test.each(getAllDbNodeTypes())('for node type $0', async (nodeType) => {
        if (!nodeType) { // DbNodeType.Node not yet implemented
            return
        }

        const expectedAmount = Math.ceil(Math.round(Math.random() * 10))
        await seedNodes(nodeType, expectedAmount)

        const actualNodeCount = await fetchNodeCountByNodeType(nodeType)

        expect(actualNodeCount)
            .to.equal(expectedAmount)
    })
})
