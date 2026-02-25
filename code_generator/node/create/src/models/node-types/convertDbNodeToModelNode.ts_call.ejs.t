---
inject: true
to: src/models/node-types/convertDbNodeToModelNode.ts
before: "case DbNodeType.Image"
skip_if: "dbNode as <%= h.changeCase.pascal(nodeType) %>Node"
---
        case DbNodeType.<%= h.changeCase.pascal(nodeType) %>:
            return convert<%= h.changeCase.pascal(nodeType) %>DbNodeToModelNode(dbNode as <%= h.changeCase.pascal(nodeType) %>Node)