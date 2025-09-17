import {Document, Feature, Rule, Scenario, ScenarioOutline, Step, Tag} from "gherkin-ast"
import {format} from "gherkin-formatter"
import type {FeatureFileData} from "./types/FeatureFileData"
import {read, write} from "gherkin-io"

export async function assembleFeatureFile(data: FeatureFileData): Promise<string> {
    const document: Document = new Document('doc')

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

    document.feature = feature

    // (complicated way to) reformat the feature file, so it is properly indented
    await write("./_temp/test.feature", document)
    const reloaded = await read("./_temp/test.feature")

    return format(reloaded[0]) + '\n'
}
