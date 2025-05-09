import {Driver, Node, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../driver"
import {CarModelNode} from "../../types/CarModelNode"

export async function getNodeById(id: number): Promise<false | CarModelNode> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const foundNode = await getNode(id, driver)

    await session.close()
    await closeDriver(driver)

    return foundNode
}

async function getNode(id: number, driver: Driver): Promise<false | CarModelNode> {
    const {records} = await driver.executeQuery(`
            MATCH (node:CarModel {mc_id: ${id}}) 
            RETURN node
            LIMIT 1`,
    )

    if (records.length === 0) {
        return false
    }

    const foundDbNode: Node = records[0].get('node')

    const node: CarModelNode = {
        id: foundDbNode.properties.mc_id,
        name: foundDbNode.properties.name,
        built_from: foundDbNode.properties.built_from,
        built_to: foundDbNode.properties.built_to,
        generation: foundDbNode.properties.generation,
        internal_code: foundDbNode.properties.internal_code,
        total_production: foundDbNode.properties.total_production,
    }

    return node
}
