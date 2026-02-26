---
to: tests/performance/scenarios/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/create-<%= h.changeCase.kebab(relationshipName) %>-relationship.ts
---
import http from 'k6/http'
import {check} from "k6"
import {Trend} from "k6/metrics"
import {createNode} from "../../_testdata/createNode.ts"
import {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType.ts"

const trendDuration = new Trend('duration', true)

export const options = {
    summaryTrendStats: ['count', 'min', 'p(1)', 'p(90)', 'p(95)', 'p(98)'],
    thresholds: {
        http_req_failed: ['rate<=0.0'],
        duration: ['p(1)<=30', 'p(90)<=150', 'p(95)<=300', 'p(98)<=750'],
    },
    scenarios: {
        create<%= h.changeCase.pascal(relationshipName) %>Relationship: {
            executor: 'constant-arrival-rate',
            duration: '5m',
            rate: 1,
            timeUnit: '2s',
            preAllocatedVUs: 5,
            maxVUs: 5,
            gracefulStop: '10s',
        }
    }
}

export function setup() {
    const <%= h.changeCase.camel(startNodeType) %>Id = createNode(ControllerNodeType.<%= h.changeCase.pascal(startNodeType) %>)
    const <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id = createNode(ControllerNodeType.<%= h.changeCase.pascal(endNodeType) %>)

    return {
        <%= h.changeCase.camel(startNodeType) %>Id,
        <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id,
    }
}

export default function (data: { <%= h.changeCase.camel(startNodeType) %>Id: number, <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id: number }) {
    const url = `${__ENV.API_URL}/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/${data.<%= h.changeCase.camel(startNodeType) %>Id}/<%= h.changeCase.kebab(relationshipName) %>/${data.<%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id}`

    const response = http.post(url)

    check(response, {
        'returns with status code 201 or 304': (r) => (r.status === 201 || r.status === 304),
    })

    trendDuration.add(response.timings.duration)
}
