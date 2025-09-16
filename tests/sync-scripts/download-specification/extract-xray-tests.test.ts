import fs from "fs"
import {expect, test} from "vitest"
import type {XrayTest} from "../../../specification/sync-scripts/download-specification/lib/types/XrayTest"
import {validateJson} from "../../_toolbox/validateJson.ts"
import {TestSchema} from "./schemas/TestSchema"
import {extractXrayTests} from "../../../specification/sync-scripts/download-specification/lib/extractXrayTests"

test('Extracting all test data from the Xray response', async () => {
    const xrayTests: Array<XrayTest> = JSON.parse(
        fs.readFileSync(__dirname + '/fixtures/xray_test_collection.json', {
            encoding: 'utf8',
            flag: 'r'
        }))

    const extractedTests = extractXrayTests(xrayTests)

    expect(extractedTests.length)
        .toEqual(xrayTests.length)

    extractedTests.forEach((story) => {
        expect(validateJson(story, TestSchema))
            .toBeTruthy()
    })
})
