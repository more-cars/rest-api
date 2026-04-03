import {describe, expect, test} from 'vitest'
import {getAllDbNodeTypes} from "../../../../_toolbox/getAllDbNodeTypes"
import {getNodeTypeCollectionQuery} from "../../../../../src/db/nodes/getNodeTypeCollectionQuery"
import {DbFilterOperator} from "../../../../../src/db/types/DbFilterOperator"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

describe('database query for fetching all nodes of a type - pagination', () => {
    test.each([
        [1, 0, 100],
        [2, 100, 100],
        [10, 1000, 100],
    ])('page $0', async (page, offset, limit) => {
        getAllDbNodeTypes().forEach((nodeType) => {
            const query = getNodeTypeCollectionQuery(nodeType, {
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
                    "MATCH (node:" + nodeType + "_A_" + appInstanceId + ")\n" +
                    "WHERE node.dummy = 'dummy'\n" +
                    "RETURN node\n" +
                    "  ORDER BY toLower(toString(node.dummy)) dummy\n" +
                    "  SKIP " + offset + "\n" +
                    "  LIMIT " + limit)
        })
    })
})
