---
to: tests/_toolbox/dbSeeding/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/deleteAll<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>.ts
---
import neo4j, {Driver, Session} from "neo4j-driver"
import {getDriver} from "../../../../../src/db/driver"

export async function deleteAll<%= h.changeCase.pascal(h.inflection.pluralize(nodeType)) %>() {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    await session.executeWrite(async txc => {
        await txc.run(`
            MATCH (node:<%= h.changeCase.pascal(nodeType) %>)
            DETACH DELETE node
        `)
    })

    await session.close()
    await driver.close()
}
