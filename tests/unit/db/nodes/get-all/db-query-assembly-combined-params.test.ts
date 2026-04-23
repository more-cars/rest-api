import {describe, expect, test} from 'vitest'
import {getAllDbNodeTypes} from "../../../../_toolbox/getAllDbNodeTypes"
import {getNodeTypeCollectionQuery} from "../../../../../src/db/nodes/getNodeTypeCollectionQuery"
import {DbFilterOperator} from "../../../../../src/db/types/DbFilterOperator"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

describe('database query for fetching all nodes of a type - combined params', () => {
    test.each([
        ['mc_id', 'ASC', 'name', 'BMW', DbFilterOperator.equal, 0, 100],
        ['mc_id', 'ASC', 'max_power', '500', DbFilterOperator.greater_than, 0, 100],
    ])('combined params', async (sortByProperty, sortDirection, filterByProperty, filterValue, filterOperator, offset, limit) => {
        getAllDbNodeTypes().forEach((nodeType) => {
            const query = getNodeTypeCollectionQuery(nodeType, {
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
                    "MATCH (n:" + nodeType + "_A_" + appInstanceId + ")\n" +
                    "WHERE n." + filterByProperty + " " + filterOperator + " '" + filterValue + "'\n" +
                    "RETURN n\n" +
                    "  ORDER BY toLower(toString(n." + sortByProperty + ")) " + sortDirection + "\n" +
                    "  SKIP " + offset + "\n" +
                    "  LIMIT " + limit)
        })
    })
})
