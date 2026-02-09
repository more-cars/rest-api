---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: \nexport const
skip_if: import {DbRelationship} from
---
import {DbRelationship} from "../../db/types/DbRelationship"