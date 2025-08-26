---
inject: true
to: src/controllers/<%= h.changeCase.pascal(startNodeType) %>Controller.ts
before: class
skip_if: "./carModels/create<%= h.changeCase.pascal(relationshipName) %>Relation"
---
import {create<%= h.changeCase.pascal(relationshipName) %>Relation} from "./carModels/create<%= h.changeCase.pascal(relationshipName) %>Relation"
