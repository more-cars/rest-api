---
to: tests/unit/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create/unmarshalling/unmarshalling-where-optional-fields-are-missing.test.ts
---
<%
    props_in = []
    for (prop in properties) {
        if (properties[prop].mandatory && properties[prop].datatype === 'string') {
            props_in.push(prop + ': "' + properties[prop].example + '"')
        } else if (properties[prop].mandatory) {
            props_in.push(prop + ': ' + properties[prop].example)
        }
    }

    props_out = []
    for (prop in properties) {
        if (properties[prop].mandatory && properties[prop].datatype === 'string') {
            props_out.push(prop + ': "' + properties[prop].example + '"')
        } else if (properties[prop].mandatory) {
            props_out.push(prop + ': ' + properties[prop].example)
        } else {
            props_out.push(prop + ': undefined')
        }
    }
-%>
import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/marshalling/unmarshalInputData"

/**
 * Missing optional fields are automatically added as "undefined".
 */
test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: any = {
<%- props_in.map(line => '        ' + line).join(',\n') %>,
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
<%- props_out.map(line => '            ' + line).join(',\n') %>,
        })
})
