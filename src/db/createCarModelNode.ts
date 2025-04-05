import {Driver, Node, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "./driver"
import {CarModelNode} from "../types/CarModelNode"

export async function createCarModelNode(carModelData: CarModelNode): Promise<CarModelNode> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const createdNode = await createCarModel(carModelData, driver)

    await session.close()
    await closeDriver(driver)

    return createdNode
}

async function createCarModel(carModelData: CarModelNode, driver: Driver): Promise<CarModelNode> {
    // 1. Creating the node in the database
    const {records} = await driver.executeQuery(`
            CREATE (cm:CarModel {name: $name}) 
            RETURN cm 
            LIMIT 1`,
        carModelData,
    )
    const createdDbNode: Node = records[0].get('cm')

    // 2. Adding a custom More Cars ID for that node
    // Note: This seems pointless at first glance, because the More Cars ID is exactly the same as the Neo4j ID.
    //       The benefit: we can modify the More Cars ID anytime, while the Neo4j ID is always read-only.
    //       This will become relevant when migrating nodes from the old database.
    //       In that scenario we need to be able to carry over the existing IDs.
    const elementId = createdDbNode.elementId
    const elementIdSplit: Array<string> = elementId.split(':')
    const moreCarsId: number = parseInt(elementIdSplit[2])
    const enrichedDbNode: Node = await setMoreCarsId(elementId, moreCarsId, driver)

    // 3. Converting the Neo4j node to a More Cars node
    const node: CarModelNode = {
        id: enrichedDbNode.properties.mc_id,
        name: enrichedDbNode.properties.name
    }

    return node
}

async function setMoreCarsId(elementId: string, moreCarsId: number, driver: Driver): Promise<Node> {
    const {records} = await driver.executeQuery(`
        MATCH (node:CarModel) 
        WHERE elementId(node) = "${elementId}"
        SET node.mc_id = ${moreCarsId}
        RETURN node
        LIMIT 1
    `)

    return records[0].get('node')
}
