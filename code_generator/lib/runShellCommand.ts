import {promisify} from "util"
import {exec} from "child_process"

export async function runShellCommand(command: string): Promise<string> {
    const execute = promisify(exec)
    try {
        const {stdout, stderr} = await execute(command)
        if (stderr) {
            console.error(`Error: ${stderr}`)
        }
        return stdout
    } catch (error) {
        console.error(`Command failed: ${error}`)
        throw error
    }
}
