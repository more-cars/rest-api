---
inject: true
to: bruno/lib/<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.js
after: if (!bru.getEnvVar('valid<%= h.changeCase.pascal(nodeType) %>Id'))
skip_if: const nodeList = await getAllCompanies()
---
        const nodeList = await getAllCompanies()
        if (nodeList.length > 0) {
            bru.setEnvVar("validCompanyId", nodeList[0].data.id)
        } else {