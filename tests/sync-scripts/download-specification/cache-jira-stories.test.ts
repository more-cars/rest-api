import fs from "fs"
import {describe, expect, test} from "vitest"
import {cacheJiraTickets} from "../../../specification/sync-scripts/download-specification/lib/cacheJiraTickets"

describe('Caching downloaded Jira stories', () => {
    test('at default path with default filename', async () => {
        const jiraStories = JSON.parse(
            fs.readFileSync(__dirname + '/../../_toolbox/fixtures/specification/jira_story_collection.json', {
                encoding: 'utf8',
                flag: 'r'
            }))

        cacheJiraTickets('story', jiraStories)
        expect(fs.existsSync('./_temp/jira_story_collection.json'))
            .toBeTruthy()

        const cachedStories = JSON.parse(fs.readFileSync('./_temp/jira_story_collection.json', {
            encoding: 'utf8',
            flag: 'r'
        }))
        expect(cachedStories)
            .toEqual(jiraStories)

        fs.rmSync('./_temp/jira_story_collection.json')
        expect(fs.existsSync('./_temp/jira_story_collection.json'))
            .toBeFalsy()
    })

    test('at custom path with custom filename', async () => {
        const jiraStories = JSON.parse(
            fs.readFileSync(__dirname + '/../../_toolbox/fixtures/specification/jira_story_collection.json', {
                encoding: 'utf8',
                flag: 'r'
            }))

        cacheJiraTickets('story', jiraStories, './_temporary')
        expect(fs.existsSync('./_temporary/jira_story_collection.json'))
            .toBeTruthy()

        const cachedStories = JSON.parse(fs.readFileSync('./_temporary/jira_story_collection.json', {
            encoding: 'utf8',
            flag: 'r'
        }))
        expect(cachedStories)
            .toEqual(jiraStories)

        fs.rmSync('./_temporary', {recursive: true})
        expect(fs.existsSync('./_temporary/jira_story_collection.json'))
            .toBeFalsy()
    })
})
