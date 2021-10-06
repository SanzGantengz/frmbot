const PORT = process.env.PORT || 8080 || 5000 || 3000
var express = require('express')
var app = express()
app.listen(PORT, () => {
	console.log(`Server berjalan dengan port: ${PORT}`)
})
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

app.get('/', (req, res) => {
	res.json({result:'heleh heleh heleh'})
	console.log('GET /')
})

module.exports.Client = conn