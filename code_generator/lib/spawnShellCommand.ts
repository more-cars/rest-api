import {spawn} from 'node:child_process'

export async function spawnShellCommand(command: string) {

    const childProcess = spawn(command, {stdio: 'inherit', shell: true})

    childProcess.on('exit', (exitCode) => {
        console.log(`Process exited with code ${exitCode}`)
    })
}
