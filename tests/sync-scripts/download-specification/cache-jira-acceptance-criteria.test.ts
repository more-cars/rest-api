import fs from "fs"
import {describe, expect, test} from "vitest"
import {cacheJiraTickets} from "../../../specification/sync-scripts/download-specification/lib/cacheJiraTickets"

describe('Caching downloaded Jira acceptance criteria', () => {
    test('at default path with default filename', async () => {
        const jiraAcs = JSON.parse(
            fs.readFileSync(__dirname + '/fixtures/jira_acceptance_criterion_collection.json', {
                encoding: 'utf8',
                flag: 'r'
            }))

        cacheJiraTickets('acceptance_criteria', jiraAcs)
        expect(fs.existsSync('./_temp/jira_acceptance_criterion_collection.json'))
            .toBeTruthy()

        const cachedAcs = JSON.parse(fs.readFileSync('./_temp/jira_acceptance_criterion_collection.json', {
            encoding: 'utf8',
            flag: 'r'
        }))
        expect(cachedAcs)
            .toEqual(jiraAcs)

        fs.rmSync('./_temp/jira_acceptance_criterion_collection.json')
        expect(fs.existsSync('./_temp/jira_acceptance_criterion_collection.json'))
            .toBeFalsy()
    })

    test('at custom path with custom filename', async () => {
        const jiraAcs = JSON.parse(
            fs.readFileSync(__dirname + '/fixtures/jira_acceptance_criterion_collection.json', {
                encoding: 'utf8',
                flag: 'r'
            }))

        cacheJiraTickets('acceptance_criteria', jiraAcs, './_temporary')
        expect(fs.existsSync('./_temporary/jira_acceptance_criterion_collection.json'))
            .toBeTruthy()

        const cachedAcs = JSON.parse(fs.readFileSync('./_temporary/jira_acceptance_criterion_collection.json', {
            encoding: 'utf8',
            flag: 'r'
        }))
        expect(cachedAcs)
            .toEqual(jiraAcs)

        fs.rmSync('./_temporary', {recursive: true})
        expect(fs.existsSync('./_temporary/jira_acceptance_criterion_collection.json'))
            .toBeFalsy()
    })
})
