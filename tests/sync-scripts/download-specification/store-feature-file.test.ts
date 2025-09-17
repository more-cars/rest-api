import {test} from "vitest"
import fs from "fs"
import {storeFeatureFile} from "../../../specification/sync-scripts/download-specification/lib/storeFeatureFile"

test('Saving the assembled Gherkin feature file to disk', async () => {
    const featureFile =
        fs.readFileSync(__dirname + '/fixtures/feature_file.feature', {
            encoding: 'utf8',
            flag: 'r'
        })

    const randomSuffix = Math.floor(Math.random() * 100000)
    const storagePath = __dirname + '/_temp/Behavior_' + randomSuffix + '/'

    storeFeatureFile(featureFile, storagePath, 'ABC-123')
})
