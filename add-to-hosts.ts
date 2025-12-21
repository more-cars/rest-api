import * as fs from 'fs'

const hostsPath = '/etc/hosts'

function addToHosts(ip: string, domain: string) {
    const entry = `${ip} ${domain}\n`

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
}

addToHosts('127.0.0.1', 'api.more-cars.internal')
addToHosts('127.0.0.1', 'db.more-cars.internal')
