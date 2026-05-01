import {expect, test} from 'vitest'
import type {QueryInputData} from "../../../../../src/db/types/QueryInputData"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('single quotes are correctly escaped', async () => {
    const data: QueryInputData = {
        name: "'BMW AG",
        founded: null,
        defunct: null,
        headquarters_location: "'Munich",
        hq_country_code: "'DE",
        legal_headquarters_location: "'Munich",
        legal_hq_country_code: "'DE",
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
    }

    const query = createNodeQuery(DbNodeType.Company, data)

    expect(query)
        .toEqual(
            "CREATE (n:Company_A_" + appInstanceId + " {\n" +
            "  name: '\\'BMW AG',\n" +
            "  founded: null,\n" +
            "  defunct: null,\n" +
            "  headquarters_location: '\\'Munich',\n" +
            "  hq_country_code: '\\'DE',\n" +
            "  legal_headquarters_location: '\\'Munich',\n" +
            "  legal_hq_country_code: '\\'DE',\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
