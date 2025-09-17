import {expect, test} from "vitest"
import fs from "fs"
import {assembleFeatureFile} from "../../../specification/sync-scripts/download-specification/lib/assembleFeatureFile"
import type {
    FeatureFileData
} from "../../../specification/sync-scripts/download-specification/lib/types/FeatureFileData"

test('Assemble Gherkin feature file based on the collected data', async () => {
    const data: FeatureFileData = JSON.parse(
        fs.readFileSync(__dirname + '/fixtures/feature_file.json', {
            encoding: 'utf8',
            flag: 'r'
        }))

    const expectedFeatureFile =
        fs.readFileSync(__dirname + '/fixtures/feature_file.feature', {
            encoding: 'utf8',
            flag: 'r'
        })

    const actualFeatureFile = await assembleFeatureFile(data)

    expect(actualFeatureFile)
        .toStrictEqual(expectedFeatureFile)
})
