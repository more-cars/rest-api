import {describe, expect, test} from 'vitest'
import {getAllNodeTypes} from "../../../../_toolbox/getAllNodeTypes"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"
import {getAllNodesOfTypeQuery} from "../../../../../src/db/nodes/getAllNodesOfTypeQuery"
import {DbFilterOperator} from "../../../../../src/db/types/DbFilterOperator"

describe('db query assembly for "get all nodes" - filtering', () => {
    test.each([
        ['mc_id', '1234', DbFilterOperator.equal],
        ['mc_id', '1234', DbFilterOperator.greater_than],
        ['name', 'test', DbFilterOperator.equal],
        ['name', '  test  ', DbFilterOperator.equal],
    ])('filter by $0 $2 $1', async (filterByProperty, filterValue, filterOperator) => {
        getAllNodeTypes().forEach((nodeType: NodeTypeLabel) => {
            const query = getAllNodesOfTypeQuery(nodeType, {
                sortByProperty: 'dummy',
                sortDirection: 'dummy',
                filterByProperty,
                filterValue,
                filterOperator,
                offset: 0,
                limit: 100,
            })

            expect(query)
                .toEqual(
                    "MATCH (node:" + nodeType + ")\n" +
                    "WHERE node." + filterByProperty + " " + filterOperator + " '" + filterValue + "'\n" +
                    "RETURN node\n" +
                    "  ORDER BY node.dummy dummy\n" +
                    "  SKIP 0\n" +
                    "  LIMIT 100")
        })
    })
})
