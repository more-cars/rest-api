import fs from "fs"
import {describe, expect, test} from "vitest"
import {cacheXrayTickets} from "../../../specification/sync-scripts/download-specification/lib/cacheJiraTickets"

describe('Caching downloaded Xray tests', () => {
    test('at default path with default filename', async () => {
        const xrayTests = JSON.parse(
            fs.readFileSync(__dirname + '/fixtures/xray_test_collection.json', {
                encoding: 'utf8',
                flag: 'r'
            }))

        cacheXrayTickets('test', xrayTests)
        expect(fs.existsSync('./_temp/xray_test_collection.json'))
            .toBeTruthy()

        const cachedTests = JSON.parse(fs.readFileSync('./_temp/xray_test_collection.json', {
            encoding: 'utf8',
            flag: 'r'
        }))
        expect(cachedTests)
            .toEqual(xrayTests)

        fs.rmSync('./_temp/xray_test_collection.json')
        expect(fs.existsSync('./_temp/xray_test_collection.json'))
            .toBeFalsy()
    })

    test('at custom path with custom filename', async () => {
        const xrayTests = JSON.parse(
            fs.readFileSync(__dirname + '/fixtures/xray_test_collection.json', {
                encoding: 'utf8',
                flag: 'r'
            }))

        cacheXrayTickets('test', xrayTests, './_temporary')
        expect(fs.existsSync('./_temporary/xray_test_collection.json'))
            .toBeTruthy()

        const cachedTests = JSON.parse(fs.readFileSync('./_temporary/xray_test_collection.json', {
            encoding: 'utf8',
            flag: 'r'
        }))
        expect(cachedTests)
            .toEqual(xrayTests)

        fs.rmSync('./_temporary', {recursive: true})
        expect(fs.existsSync('./_temporary/xray_test_collection.json'))
            .toBeFalsy()
    })
})
