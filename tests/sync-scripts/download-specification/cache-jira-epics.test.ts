import fs from "fs"
import {describe, expect, test} from "vitest"
import {cacheJiraTickets} from "../../../specification/sync-scripts/download-specification/lib/cacheJiraTickets"

describe('Caching downloaded Jira epics', () => {
    test('at default path with default filename', async () => {
        const jiraEpics = JSON.parse(
            fs.readFileSync(__dirname + '/../../_toolbox/fixtures/specification/jira_epic_collection.json', {
                encoding: 'utf8',
                flag: 'r'
            }))

        cacheJiraTickets('epic', jiraEpics)
        expect(fs.existsSync('./_temp/jira_epic_collection.json'))
            .toBeTruthy()

        const cachedEpics = JSON.parse(fs.readFileSync('./_temp/jira_epic_collection.json', {
            encoding: 'utf8',
            flag: 'r'
        }))
        expect(cachedEpics)
            .toEqual(jiraEpics)

        fs.rmSync('./_temp/jira_epic_collection.json')
        expect(fs.existsSync('./_temp/jira_epic_collection.json'))
            .toBeFalsy()
    })

    test('at custom path with custom filename', async () => {
        const jiraEpics = JSON.parse(
            fs.readFileSync(__dirname + '/../../_toolbox/fixtures/specification/jira_epic_collection.json', {
                encoding: 'utf8',
                flag: 'r'
            }))

        cacheJiraTickets('epic', jiraEpics, './_temporary')
        expect(fs.existsSync('./_temporary/jira_epic_collection.json'))
            .toBeTruthy()

        const cachedEpics = JSON.parse(fs.readFileSync('./_temporary/jira_epic_collection.json', {
            encoding: 'utf8',
            flag: 'r'
        }))
        expect(cachedEpics)
            .toEqual(jiraEpics)

        fs.rmSync('./_temporary', {recursive: true})
        expect(fs.existsSync('./_temporary/jira_epic_collection.json'))
            .toBeFalsy()
    })
})
