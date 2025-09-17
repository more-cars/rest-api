import {Document, Feature, Rule, Scenario, ScenarioOutline, Step, Tag} from "gherkin-ast"
import {format} from "gherkin-formatter"
import type {FeatureFileData} from "./types/FeatureFileData"

export function assembleFeatureFile(data: FeatureFileData): string {
    const feature = new Feature('Feature', data.feature.title, data.feature.user_story)
    feature.tags.push(new Tag('REQ_' + data.feature.id))

    const rule = new Rule('Rule', data.rule.title, '')
    rule.tags.push(new Tag('RULE_' + data.rule.id))
    feature.elements.push(rule)

    let scenario: Scenario | ScenarioOutline
    if (data.scenario.type === 'scenario_outline') {
        scenario = new ScenarioOutline('Scenario Outline', data.scenario.title, '')
    } else {
        scenario = new Scenario('Scenario', data.scenario.title, '')
    }
    scenario.steps.push(new Step(data.scenario.gherkin, ''))

    scenario.tags.push(new Tag('TEST_' + data.scenario.id))
    data.scenario.tags.forEach(tag => {
        scenario.tags.push(new Tag(tag))
    })
    feature.elements.push(scenario)

    const document: Document = new Document('doc')
    document.feature = feature

    return format(document) + '\n'
}
