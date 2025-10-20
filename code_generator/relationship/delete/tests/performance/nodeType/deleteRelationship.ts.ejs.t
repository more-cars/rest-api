---
to: tests/performance/scenarios/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/delete-<%= h.changeCase.kebab(relationshipName) %>-relationship.ts
---
import http from 'k6/http'
import exec from 'k6/execution'
import {check} from "k6"
import {Trend} from "k6/metrics"
import {create<%= h.changeCase.pascal(startNodeType) %>} from "../../_testdata/create<%= h.changeCase.pascal(startNodeType) %>.ts"
import {create<%= h.changeCase.pascal(endNodeType) %>} from "../../_testdata/create<%= h.changeCase.pascal(endNodeType) %>.ts"
import {createRelationship} from "../../_testdata/createRelationship.ts"
import {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"

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
    const <%= h.changeCase.camel(startNodeType) %>Id = create<%= h.changeCase.pascal(startNodeType) %>()
    const <%= h.changeCase.camel(h.inflection.pluralize(endNodeType)) %> = []

    for (let i = 0; i < 310; i++) {
        const <%= h.changeCase.camel(endNodeType) %> = create<%= h.changeCase.pascal(endNodeType) %>()
        createRelationship(
            NodeTypeEnum.<%= h.changeCase.constant(startNodeType) %>,
            <%= h.changeCase.camel(startNodeType) %>Id,
            <%= h.changeCase.camel(endNodeType) %>,
            '<%= h.changeCase.lower(relationshipName) %>',
        )
        <%= h.changeCase.camel(h.inflection.pluralize(endNodeType)) %>.push(<%= h.changeCase.camel(endNodeType) %>)
    }

    return {
        <%= h.changeCase.camel(startNodeType) %>Id,
        <%= h.changeCase.camel(h.inflection.pluralize(endNodeType)) %>
    }
}

export default function (data: { <%= h.changeCase.camel(startNodeType) %>Id: number, <%= h.changeCase.camel(h.inflection.pluralize(endNodeType)) %>: Array<number> }) {
    const <%= h.changeCase.camel(endNodeType) %>Id = data.<%= h.changeCase.camel(h.inflection.pluralize(endNodeType)) %>[exec.scenario.iterationInTest]
    const url = `${__ENV.API_URL}/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/${data.<%= h.changeCase.camel(startNodeType) %>Id}/<%= h.changeCase.kebab(relationshipName) %>/${<%= h.changeCase.camel(endNodeType) %>Id}`

    const response = http.del(url)

    check(response, {
        'returns with status code 204': (r) => r.status === 204,
    })

    trendDuration.add(response.timings.duration)
}
