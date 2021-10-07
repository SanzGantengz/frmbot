const PORT = process.env.PORT || 8080 || 5000 || 3000
var express = require('express')
var app = express()
app.listen(PORT, () => {
	console.log(`Server berjalan dengan port: ${PORT}`)
})
const qrcode = require("qrcode")
const {default: makeWASocket, default:create} = require('@adiwajshing/baileys-md')
const { 
	BufferJSON, 
	initInMemoryKeyStore, 
	WAMessage, 
	Contact, 
	SocketConfig, 
	DisconnectReason, 
	BaileysEventMap,
	GroupMetadata,
	AnyMessageContent,
	MessageType,
	MiscMessageGenerationOptions
} = require('@adiwajshing/baileys-md')
const fs = require('fs')
const conn = makeWASocket({printQRInTerminal: true})
async function makeConnection () {
sesiname = 'frmbot.json'
if (fs.existsSync(sesiname)) {
	var raw = await fs.readFileSync(filename, { encoding: 'utf8' })
    var { creds, keys } = JSON.parse(raw, BufferJSON.reviver)
    conn.loadAuth({creds,keys: initInMemoryKeyStore(keys)})
}
conn.ev.on('connection.update', async(update) => {
	const { connection, lastDisconnect, qr } = update
    if (qr) {
		conn.qr = qr
		console.log(qr)
	}
    if (connection === 'close') return conn.connect()
    if (connection === 'open') return console.log('open')
})
conn.ev.on('auth-state.update', async () => {
    console.log (`credentials updated!`)
    authInfo = conn.authState
    var datasesi = JSON.stringify(authInfo, BufferJSON.replacer)
    await fs.writeFileSync(sesiname, datasesi)
})
conn.on('new.message', (mek) => {
    console.log(mek)
})



}


app.get('/',async(req, res) => {
	res.json({result:'heleh heleh heleh'})
	console.log('GET /')
})
makeConnection()

module.exports.conn = conn