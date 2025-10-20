---
to: specification/properties/<%= h.changeCase.pascal(nodeType) %>.json
---
[
  "id",
<% for (prop in properties) { -%>
  "<%= prop -%>",
<% } -%>
  "created_at",
  "updated_at"
]
