---
to: tests/performance/scenarios/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/update.ts
---
<% const properties = JSON.parse(props) -%>
import http from 'k6/http'
import {check} from "k6"
import {Trend} from "k6/metrics"
import {createNode} from "../../_testdata/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/createNode.ts"

const trendDuration = new Trend('duration', true)

export const options = {
    summaryTrendStats: ['count', 'min', 'p(1)', 'p(90)', 'p(95)', 'p(98)'],
    thresholds: {
        http_req_failed: ['rate<=0.0'],
        duration: ['p(1)<=10', 'p(90)<=40', 'p(95)<=100', 'p(98)<=500'],
    },
    scenarios: {
        update<%= h.changeCase.pascal(nodeType) %>: {
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
    const <%= h.changeCase.camel(nodeType) %> = createNode()

    return {id: <%= h.changeCase.camel(nodeType) %>}
}

export default function (id: number) {
    const url = `${__ENV.API_URL}/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/${id}`
    const payload = {
<% properties.forEach(prop => { -%>
<%   if (prop.mandatory && prop.datatype === 'string') { -%>
        "<%= prop.name %>": "<%= prop.example %> - Updated",
<%   } else if (prop.mandatory) { -%>
        "<%= prop.name %>": <%= prop.example + 2 -%>,
<%   } -%>
<% }) -%>
    }

    const response = http.patch(
        url,
        JSON.stringify(payload),
        {
            headers: {'Content-Type': 'application/json'}
        }
    )

    check(response, {
        'returns with status code 200': (r) => r.status === 200,
        'content-type is JSON': (r) => r.headers['Content-Type'].includes('application/vnd.api+json'),
    })

    trendDuration.add(response.timings.duration)
}
