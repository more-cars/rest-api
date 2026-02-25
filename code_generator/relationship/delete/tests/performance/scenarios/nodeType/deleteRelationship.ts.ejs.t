---
to: tests/performance/scenarios/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/delete-<%= h.changeCase.kebab(relationshipName) %>-relationship.ts
---
import http from 'k6/http'
import exec from 'k6/execution'
import {check} from "k6"
import {Trend} from "k6/metrics"
import {createNode} from "../../_testdata/createNode.ts"
import {createRelationship} from "../../_testdata/createRelationship.ts"
import {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType.ts"

const trendDuration = new Trend('duration', true)

export const options = {
    summaryTrendStats: ['count', 'min', 'p(1)', 'p(90)', 'p(95)', 'p(98)'],
    thresholds: {
        http_req_failed: ['rate<=0.0'],
        duration: ['p(1)<=10', 'p(90)<=40', 'p(95)<=100', 'p(98)<=500'],
    },
    scenarios: {
        delete<%= h.changeCase.pascal(relationshipName) %>Relationship: {
            executor: 'constant-arrival-rate',
            duration: '5m',
            rate: 1,
            timeUnit: '1s',
            preAllocatedVUs: 1,
            maxVUs: 1,
            gracefulStop: '10s',
        }
    }
}

export function setup() {
    const <%= h.changeCase.camel(startNodeType) %>Id = createNode(NodeTypeEnum.<%= h.changeCase.constant(startNodeType) %>)
    const <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Ids = []

    for (let i = 0; i < 310; i++) {
        const <%= h.changeCase.camel(endNodeType) %> = createNode(NodeTypeEnum.<%= h.changeCase.constant(endNodeType) %>)
        createRelationship(
            NodeTypeEnum.<%= h.changeCase.constant(startNodeType) %>,
            <%= h.changeCase.camel(startNodeType) %>Id,
            <%= h.changeCase.camel(endNodeType) %>,
            '<%= h.changeCase.lower(relationshipName) %>',
        )
        <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Ids.push(<%= h.changeCase.camel(endNodeType) %>)
    }

    return {
        <%= h.changeCase.camel(startNodeType) %>Id,
        <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Ids
    }
}

export default function (data: { <%= h.changeCase.camel(startNodeType) %>Id: number, <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Ids: number[] }) {
    const <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id = data.<%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Ids[exec.scenario.iterationInTest]
    const url = `${__ENV.API_URL}/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/${data.<%= h.changeCase.camel(startNodeType) %>Id}/<%= h.changeCase.kebab(relationshipName) %>/${<%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id}`

    const response = http.del(url)

    check(response, {
        'returns with status code 204': (r) => r.status === 204,
    })

    trendDuration.add(response.timings.duration)
}
