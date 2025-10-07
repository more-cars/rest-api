import {describe, expect, test} from 'vitest'
import {getAllNodeTypes} from "../../../../_toolbox/getAllNodeTypes"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"
import {getAllNodesOfTypeQuery} from "../../../../../src/db/nodes/getAllNodesOfTypeQuery"
import {DbFilterOperator} from "../../../../../src/db/types/DbFilterOperator"

describe('db query assembly for "get all nodes" - pagination', () => {
    test.each([
        [1, 0, 100],
        [2, 100, 100],
        [10, 1000, 100],
    ])('page $0', async (page, offset, limit) => {
        getAllNodeTypes().forEach((nodeType: NodeTypeLabel) => {
            const query = getAllNodesOfTypeQuery(nodeType, {
                sortByProperty: 'dummy',
                sortDirection: 'dummy',
                filterByProperty: 'dummy',
                filterValue: 'dummy',
                filterOperator: DbFilterOperator.equal,
                offset,
                limit,
            })

            expect(query)
                .toEqual(
                    "MATCH (node:" + nodeType + ")\n" +
                    "WHERE node.dummy = 'dummy'\n" +
                    "RETURN node\n" +
                    "  ORDER BY node.dummy dummy\n" +
                    "  SKIP " + offset + "\n" +
                    "  LIMIT " + limit)
        })
    })
})
