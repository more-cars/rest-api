---
inject: true
to: src/specification/getNodeTypeSpecification.ts
before: "ImageNodeSpecification"
skip_if: "import {<%= h.changeCase.pascal(nodeType) %>NodeSpecification} from"
---
        import {<%= h.changeCase.pascal(nodeType) %>NodeSpecification} from "./node-types/<%= h.changeCase.pascal(nodeType) %>NodeSpecification"