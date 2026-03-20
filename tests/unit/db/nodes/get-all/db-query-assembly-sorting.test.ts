import {describe, expect, test} from 'vitest'
import {getAllDbNodeTypes} from "../../../../_toolbox/getAllDbNodeTypes"
import {getNodeTypeCollectionQuery} from "../../../../../src/db/nodes/getNodeTypeCollectionQuery"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

describe('database query for fetching all nodes of a type - sorting', () => {
    test.each([
        ['mc_id', 'ASC'],
        ['name', 'ASC'],
        ['mc_id', 'DESC'],
        ['name', 'DESC'],
    ])('sorting by $0 $1', async (sortByProperty, sortDirection) => {
        getAllDbNodeTypes().forEach((nodeType) => {
            const query = getNodeTypeCollectionQuery(nodeType, {
                sortByProperty,
                sortDirection,
                offset: 0,
                limit: 100,
            })

            expect(query)
                .toEqual(
                    "MATCH (node:" + nodeType + "_" + appInstanceId + ")\n" +
                    "RETURN node\n" +
                    "  ORDER BY toLower(toString(node." + sortByProperty + ")) " + sortDirection + "\n" +
                    "  SKIP 0\n" +
                    "  LIMIT 100")
        })
    })
})
