import {describe, expect, test} from 'vitest'
import {getAllDbNodeTypes} from "../../../../_toolbox/getAllDbNodeTypes"
import {fetchNodesPrimeImageQuery} from "../../../../../src/db/nodes/fetchNodesPrimeImage"

describe('assembling the database query for fetching the prime images', () => {
    test('for an empty node collection', async () => {
        getAllDbNodeTypes().forEach(() => {
            const query = fetchNodesPrimeImageQuery([])

            expect(query)
                .toEqual(
                    "MATCH (a)-[r:HAS_PRIME_IMAGE]->(b)\n" +
                    "  WHERE a.mc_id IN []\n" +
                    "RETURN a, r, b\n" +
                    "  LIMIT 100")
        })
    })

    test('for a populated node collection', async () => {
        getAllDbNodeTypes().forEach(() => {
            const query = fetchNodesPrimeImageQuery([10, 20, 30, 99])

            expect(query)
                .toEqual(
                    "MATCH (a)-[r:HAS_PRIME_IMAGE]->(b)\n" +
                    "  WHERE a.mc_id IN [10,20,30,99]\n" +
                    "RETURN a, r, b\n" +
                    "  LIMIT 100")
        })
    })
})
