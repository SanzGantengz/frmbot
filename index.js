const {default: makeWASocket} = require('@adiwajshing/baileys-md')
const { BufferJSON, initInMemoryKeyStore } = require('@adiwajshing/baileys-md')
const fs = require('fs')
const conn = makeWASocket({printQRInTerminal: true})
async function makeConnection () {
conn.ev.on('auth-state.update', () => {
    console.log (`credentials updated!`)
    const authInfo = conn.authState
    fs.writeFileSync(
        'Ameno.json', 
        JSON.stringify(authInfo, BufferJSON.replacer, 2)
    ) 
})

}
makeConnection()
module.exports.Client = conn