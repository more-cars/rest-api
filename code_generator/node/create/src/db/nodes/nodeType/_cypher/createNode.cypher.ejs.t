---
to: src/db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/_cypher/createNode.cypher
---
CREATE (node:<%= h.changeCase.pascal(nodeType) %> {
<%
    const props = []
    for (prop in properties) {
        props.push('  ' + prop + ': $' + prop)
    }
-%>
<%= props.join(',\n') %>
})
RETURN node
  LIMIT 1
