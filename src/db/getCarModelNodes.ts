import {Driver, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "./driver"
import {CarModelNode} from "../types/CarModelNode"

export async function getCarModelNodes(): Promise<Array<CarModelNode>> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const foundNodes = await getCarModels(driver)

    await session.close()
    await closeDriver(driver)

    return foundNodes
}

async function getCarModels(driver: Driver): Promise<Array<CarModelNode>> {
    const carModelNodes: Array<CarModelNode> = []

    const {records} = await driver.executeQuery(`
            MATCH (node:CarModel) 
            RETURN node`,
    )

    records.forEach(record => {
        const dbNode = record.get('node')
        carModelNodes.push({
            id: dbNode.properties.mc_id,
            name: dbNode.properties.name
        })
    })

    return carModelNodes
}
