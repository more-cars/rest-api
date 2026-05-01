import {describe, expect, test, vi} from 'vitest'
import {getAllModelNodeTypes} from "../../../../_toolbox/getAllModelNodeTypes"
import * as node from "../../../../../src/db/nodes/fetchNodeCountByNodeType"
import {Node} from "../../../../../src/models/Node"

describe('get total amount of nodes', () => {
    test.each(getAllModelNodeTypes())('for node type $0', async (nodeType) => {
        vi.spyOn(node, 'fetchNodeCountByNodeType')
            .mockImplementation(async () => 7)

        const actualNodeCount = await Node.getTotalAmount(nodeType)

        expect(actualNodeCount)
            .to.equal(7)
    })
})