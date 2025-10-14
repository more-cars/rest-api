---
inject: true
to: bruno/lib/<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.js
after: if (!bru.getEnvVar('valid<%= h.changeCase.pascal(nodeType) %>Id'))
skip_if: const nodeList = await getAll<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>()
---
        const nodeList = await getAll<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>()
        if (nodeList.length > 0) {
            bru.setEnvVar("valid<%= h.changeCase.pascal(nodeType) %>Id", nodeList[0].data.id)
        } else {