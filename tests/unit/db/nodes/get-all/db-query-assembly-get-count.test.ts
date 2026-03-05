import {describe, expect, test} from 'vitest'
import {getAllDbNodeTypes} from "../../../../_toolbox/getAllDbNodeTypes"
import {fetchNodeCountByNodeTypeQuery} from "../../../../../src/db/nodes/fetchNodeCountByNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"
import {DbFilterOperator} from "../../../../../src/db/types/DbFilterOperator"

describe('database query for fetching the node count', () => {
    test.each(getAllDbNodeTypes())('for node type $0', async (nodeType) => {
        const params = {
            filterByProperty: 'name',
            filterOperator: DbFilterOperator.not_equal,
            filterValue: 'test',
            sortByProperty: 'dummy',
            sortDirection: 'dummy',
            offset: 0,
            limit: 0,
        }
        const query = fetchNodeCountByNodeTypeQuery(nodeType, params)

        expect(query)
            .toEqual(
                "MATCH (node:" + nodeType + "_" + appInstanceId + ")\n" +
                "WHERE node." + params.filterByProperty + " " + params.filterOperator + " '" + params.filterValue + "'\n" +
                "RETURN count(node) as nodeCount")
    })
})
