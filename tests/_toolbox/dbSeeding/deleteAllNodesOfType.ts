import neo4j, {Driver, Session} from "neo4j-driver"
import {NodeTypeEnum} from "../../../src/controllers/nodes/types/NodeTypeEnum"
import {getDriver} from "../../../src/db/driver"
import {pascalCase} from "change-case"

export async function deleteAllNodesOfType(nodeType: NodeTypeEnum) {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    const dbNodeType = pascalCase(nodeType)

    await session.executeWrite(async txc => {
        await txc.run(`
            MATCH (node:${dbNodeType})
            DETACH DELETE node
        `)
    })

    await session.close()
    await driver.close()
}
