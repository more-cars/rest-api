import {spawn} from 'node:child_process'

export async function spawnShellCommand(command: string) {
    const childProcess = spawn(command, {stdio: 'inherit', shell: true})

    return new Promise((resolve, reject) => {
        childProcess.on('exit', (code) => {
            if (code === 0) {
                resolve({code})
            } else {
                reject(new Error(`Process exited with code ${code}`))
            }
        })

        childProcess.on('error', (err) => {
            reject(err)
        })
    })
}
