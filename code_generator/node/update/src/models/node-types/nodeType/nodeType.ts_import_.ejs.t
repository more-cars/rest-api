---
inject: true
to: src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>.ts
before: deleteNode
skip_if: import {updateDbNode}
---
import {updateDbNode} from "../../../db/nodes/updateDbNode"
import type {<%= h.changeCase.pascal(nodeType) %>Input} from "./types/<%= h.changeCase.pascal(nodeType) %>Input"
import {Revision} from "../revisions/Revision"