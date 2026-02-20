import {describe, expect, test} from 'vitest'
import {getAllNodeTypes} from "../../../../_toolbox/getAllNodeTypes"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {getAllNodesOfTypeQuery} from "../../../../../src/db/nodes/getAllNodesOfTypeQuery"
import {DbFilterOperator} from "../../../../../src/db/types/DbFilterOperator"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

describe('database query for fetching all nodes of a type - combined params', () => {
    test.each([
        ['mc_id', 'ASC', 'name', 'BMW', DbFilterOperator.equal, 0, 100],
        ['mc_id', 'ASC', 'max_power', '500', DbFilterOperator.greater_than, 0, 100],
    ])('combined params', async (sortByProperty, sortDirection, filterByProperty, filterValue, filterOperator, offset, limit) => {
        getAllNodeTypes().forEach((nodeType: DbNodeType) => {
            const query = getAllNodesOfTypeQuery(nodeType, {
                sortByProperty,
                sortDirection,
                filterByProperty,
                filterValue,
                filterOperator,
                offset,
                limit,
            })

            expect(query)
                .toEqual(
                    "MATCH (node:" + nodeType + "_" + appInstanceId + ")\n" +
                    "WHERE node." + filterByProperty + " " + filterOperator + " '" + filterValue + "'\n" +
                    "RETURN node\n" +
                    "  ORDER BY node." + sortByProperty + " " + sortDirection + "\n" +
                    "  SKIP " + offset + "\n" +
                    "  LIMIT " + limit)
        })
    })
})
