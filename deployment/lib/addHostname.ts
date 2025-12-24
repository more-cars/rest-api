import * as fs from 'fs'

(() => {
    const domain = process.argv[2]
    const ip = process.argv[3]

    if (!domain || !ip) {

        return
    }

    const entry = `${ip} ${domain}\n`
    const hostsPath = '/etc/hosts'

    fs.readFile(hostsPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading /etc/hosts:', err)
            return
        }

        if (data.includes(entry)) {
            console.log(`${domain} is already present in /etc/hosts`)
        } else {
            fs.appendFile(hostsPath, entry, (err) => {
                if (err) {
                    console.error('Error writing to /etc/hosts:', err)
                } else {
                    console.log(`Added ${domain} to /etc/hosts`)
                }
            })
        }
    })
})()
