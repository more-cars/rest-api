import {expect, test} from "vitest"
import {getDbQueryCollectionParams} from "../../../../../src/db/nodes/getDbQueryCollectionParams"

test.each([
    [1, 0, 100],
    [2, 100, 100],
    [3, 200, 100],
    [99, 9800, 100],
])('converting the page parameter to the respective db query parameters', async (page, offset, limit) => {
    const dbParams = getDbQueryCollectionParams({page})

    expect(dbParams.offset).to.equal(offset)
    expect(dbParams.limit).to.equal(limit)
})
