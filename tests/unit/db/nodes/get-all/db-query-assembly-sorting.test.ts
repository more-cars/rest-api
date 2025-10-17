import {describe, expect, test} from 'vitest'
import {getAllNodeTypes} from "../../../../_toolbox/getAllNodeTypes"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"
import {getAllNodesOfTypeQuery} from "../../../../../src/db/nodes/getAllNodesOfTypeQuery"
import {DbFilterOperator} from "../../../../../src/db/types/DbFilterOperator"

describe('database query for fetching all nodes of a type - sorting', () => {
    test.each([
        ['mc_id', 'ASC'],
        ['name', 'ASC'],
        ['mc_id', 'DESC'],
        ['name', 'DESC'],
    ])('sorting by $0 $1', async (sortByProperty, sortDirection) => {
        getAllNodeTypes().forEach((nodeType: NodeTypeLabel) => {
            const query = getAllNodesOfTypeQuery(nodeType, {
                sortByProperty,
                sortDirection,
                filterByProperty: 'dummy',
                filterValue: 'dummy',
                filterOperator: DbFilterOperator.equal,
                offset: 0,
                limit: 100,
            })

            expect(query)
                .toEqual(
                    "MATCH (node:" + nodeType + ")\n" +
                    "WHERE node.dummy = 'dummy'\n" +
                    "RETURN node\n" +
                    "  ORDER BY node." + sortByProperty + " " + sortDirection + "\n" +
                    "  SKIP 0\n" +
                    "  LIMIT 100")
        })
    })
})
