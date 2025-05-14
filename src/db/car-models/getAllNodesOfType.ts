import {Driver, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../driver"
import {CarModelNode} from "../../types/car-models/CarModelNode"

export async function getAllNodesOfType(): Promise<Array<CarModelNode>> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const foundNodes = await getNodes(driver)

    await session.close()
    await closeDriver(driver)

    return foundNodes
}

async function getNodes(driver: Driver): Promise<Array<CarModelNode>> {
    const carModelNodes: Array<CarModelNode> = []

    const {records} = await driver.executeQuery(`
            MATCH (node:CarModel) 
            RETURN node`,
    )

    records.forEach(record => {
        const dbNode = record.get('node')
        carModelNodes.push({
            id: dbNode.properties.mc_id,
            name: dbNode.properties.name,
            built_from: dbNode.properties.built_from,
            built_to: dbNode.properties.built_to,
            generation: dbNode.properties.generation,
            internal_code: dbNode.properties.internal_code,
            total_production: dbNode.properties.total_production,
        })
    })

    return carModelNodes
}
