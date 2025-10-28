---
to: src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create.ts
---
import express from "express"
import {unmarshalInputData} from "./marshalling/unmarshalInputData"
import {marshalNode} from "./marshalling/marshalNode"
import {Create<%= h.changeCase.pascal(nodeType) %>Input} from "../../models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/Create<%= h.changeCase.pascal(nodeType) %>Input"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import type {Create<%= h.changeCase.pascal(nodeType) %>RawInput} from "./types/Create<%= h.changeCase.pascal(nodeType) %>RawInput"
import {isMandatoryString} from "../validators/isMandatoryString"
import {isOptionalString} from "../validators/isOptionalString"
import {isOptionalNumber} from "../validators/isOptionalNumber"
import {sendResponse201} from "../responses/sendResponse201"
import {sendResponse400} from "../responses/sendResponse400"
import {sendResponse500} from "../responses/sendResponse500"

export async function create(req: express.Request, res: express.Response) {
    const data = unmarshalInputData(req.body)

    if (!validate(data)) {
        return sendResponse400(res)
    }

    const sanitizedData = sanitize(data as Create<%= h.changeCase.pascal(nodeType) %>Input)

    try {
        const createdNode = await <%= h.changeCase.pascal(nodeType) %>.create(sanitizedData)
        const marshalledData = marshalNode(createdNode)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: Create<%= h.changeCase.pascal(nodeType) %>RawInput): boolean {
<% for (prop in properties) { -%>
<% if (properties[prop].mandatory && properties[prop].datatype === 'string') { %>
    if (!isMandatoryString(data.<%= prop -%>)) {
<% } else if (properties[prop].datatype === 'string') { %>
    if (!isOptionalString(data.<%= prop -%>)) {
<% } else if (properties[prop].mandatory && properties[prop].datatype === 'number') { %>
    if (!isMandatoryNumber(data.<%= prop -%>)) {
<% } else if (properties[prop].datatype === 'number') { %>
    if (!isOptionalNumber(data.<%= prop -%>)) {
<% } else { -%>
    // TODO Code Generator could not find a suitable validation rule for property <%= prop -%>. Bug or feature?
<% } -%>
        return false
    }
<% } -%>

    return true
}

export function sanitize(data: Create<%= h.changeCase.pascal(nodeType) %>Input): Create<%= h.changeCase.pascal(nodeType) %>Input {
    return {
<% for (prop in properties) { -%>
<%   if (properties[prop].mandatory && properties[prop].datatype === 'string') { -%>
        <%= prop -%>: data.<%= prop -%>.trim(),
<%   } else if (properties[prop].mandatory) { -%>
        <%= prop -%>: data.<%= prop -%>,
<%   } else if (properties[prop].datatype === 'string') { -%>
        <%= prop -%>: data.<%= prop -%> ? data.<%= prop -%>.trim() : null,
<%   } else { -%>
        <%= prop -%>: data.<%= prop -%> ? data.<%= prop -%> : null,
<%   } -%>
<% } -%>
    } as Create<%= h.changeCase.pascal(nodeType) %>Input
}
