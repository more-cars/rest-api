import {describe, expect, test} from 'vitest'
import {getAllDbNodeTypes} from "../../../../_toolbox/getAllDbNodeTypes"
import {getNodeTypeCollectionQuery} from "../../../../../src/db/nodes/getNodeTypeCollectionQuery"
import {DbFilterOperator} from "../../../../../src/db/types/DbFilterOperator"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

describe('database query for fetching all nodes of a type - filtering', () => {
    test.each([
        ['mc_id', '1234', DbFilterOperator.equal],
        ['mc_id', '1234', DbFilterOperator.greater_than],
        ['name', 'test', DbFilterOperator.equal],
        ['name', '  test  ', DbFilterOperator.equal],
    ])('filter by $0 $2 $1', async (filterByProperty, filterValue, filterOperator) => {
        getAllDbNodeTypes().forEach((nodeType) => {
            const query = getNodeTypeCollectionQuery(nodeType, {
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
                    "MATCH (n:" + nodeType + "_A_" + appInstanceId + ")\n" +
                    "WHERE n." + filterByProperty + " " + filterOperator + " '" + filterValue + "'\n" +
                    "RETURN n\n" +
                    "  ORDER BY toLower(toString(n.dummy)) dummy\n" +
                    "  SKIP 0\n" +
                    "  LIMIT 100")
        })
    })
})
