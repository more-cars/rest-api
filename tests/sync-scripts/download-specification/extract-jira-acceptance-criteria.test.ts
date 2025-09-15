import fs from "fs"
import {expect, test} from "vitest"
import {validateJson} from "../../_toolbox/validateJson.ts"
import type {
    JiraAcceptanceCriterion
} from "../../../specification/sync-scripts/download-specification/lib/types/JiraAcceptanceCriterion"
import {
    extractJiraAcceptanceCriteria
} from "../../../specification/sync-scripts/download-specification/lib/extractJiraAcceptanceCriteria"
import {AcceptanceCriteriaSchema} from "./schemas/AcceptanceCriteriaSchema"

test('Extracting all acceptance criteria data from the Jira response', async () => {
    const jiraAcs: Array<JiraAcceptanceCriterion> = JSON.parse(
        fs.readFileSync(__dirname + '/fixtures/jira_acceptance_criterion_collection.json', {
            encoding: 'utf8',
            flag: 'r'
        }))

    const extractedAcs = extractJiraAcceptanceCriteria(jiraAcs)

    expect(extractedAcs.length)
        .toEqual(jiraAcs.length)

    extractedAcs.forEach((ac) => {
        expect(validateJson(ac, AcceptanceCriteriaSchema))
            .toBeTruthy()
    })
})
