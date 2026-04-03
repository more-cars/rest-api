import {describe, expect, test} from 'vitest'
import {getAllDbNodeTypes} from "../../../../_toolbox/getAllDbNodeTypes"
import {fetchNodeCountByNodeTypeQuery} from "../../../../../src/db/nodes/fetchNodeCountByNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"
import {DbFilterOperator} from "../../../../../src/db/types/DbFilterOperator"

describe('assembling database query for fetching the node count', () => {
    describe('with activated filter', () => {
        test.each(getAllDbNodeTypes())('for node type $0', async (nodeType) => {
            const params = {
                filterByProperty: 'name',
                filterOperator: DbFilterOperator.not_equal,
                filterValue: 'test',
            }
            const query = fetchNodeCountByNodeTypeQuery(nodeType, params)

            expect(query)
                .toEqual(
                    "MATCH (node:" + nodeType + "_A_" + appInstanceId + ")\n" +
                    "WHERE node." + params.filterByProperty + " " + params.filterOperator + " '" + params.filterValue + "'\n" +
                    "RETURN count(node) AS nodeCount")
        })
    })

    describe('without filter', () => {
        test.each(getAllDbNodeTypes())('for node type $0', async (nodeType) => {
            const query = fetchNodeCountByNodeTypeQuery(nodeType)

            expect(query)
                .toEqual(
                    "MATCH (node:" + nodeType + "_A_" + appInstanceId + ")\n" +
                    "RETURN count(node) AS nodeCount")
        })
    })
})
