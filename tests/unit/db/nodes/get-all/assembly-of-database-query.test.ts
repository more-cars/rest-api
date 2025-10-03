import {describe, expect, test} from 'vitest'
import {getAllNodeTypes} from "../../../../_toolbox/getAllNodeTypes"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"
import {getAllNodesOfTypeQuery} from "../../../../../src/db/nodes/getAllNodesOfTypeQuery"

describe('assembly of the database query for a "get all nodes" request', () => {
    test.each([
        ['default', 'mc_id', 'ASC', 0, 100],
        ['pagination', 'mc_id', 'ASC', 0, 100],
        ['sort', 'mc_id', 'ASC', 0, 100],
        ['descending sort', 'mc_id', 'DESC', 0, 100],
    ])('$0 request', async (name, sortByProperty, sortDirection, offset, limit) => {
        getAllNodeTypes().forEach((nodeType: NodeTypeLabel) => {
            const query = getAllNodesOfTypeQuery(nodeType, {
                sortByProperty,
                sortDirection,
                offset,
                limit,
            })

            expect(query)
                .toEqual(
                    "MATCH (node:" + nodeType + ")\n" +
                    "RETURN node\n" +
                    "  ORDER BY node." + sortByProperty + " " + sortDirection + "\n" +
                    "  SKIP " + offset + "\n" +
                    "  LIMIT " + limit)
        })
    })
})
