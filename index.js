const PORT = process.env.PORT || 8080 || 5000 || 3000
var express = require('express')
var app = express()
app.listen(PORT, () => {
	console.log(`Server berjalan dengan port: ${PORT}`)
})
const fs = require('fs')
const qrcode = require("qrcode")
const { default: makeWASocket, default:create } = require('@adiwajshing/baileys-md')
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
conn = makeWASocket({printQRInTerminal: true})

async function makeConnection () {
sesiname = "./frmbot.json"
  if (fs.existsSync(sesiname)) {
	var raw = await fs.readFileSync(sesiname, { encoding: 'utf8' })
    var { creds, keys } = JSON.parse(raw, BufferJSON.reviver)
    makeWASocket({creds,keys: initInMemoryKeyStore(keys)})
  }
conn.ev.on('connection.update', async(update) => {
	const { connection, lastDisconnect, qr } = update
	console.log(JSON.stringify(update, null, 2))
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
conn.ev.on('new.message', (mek) => {
    console.log(mek)
})
conn.ev.on('messages.upsert', (messages) => {
    console.log('got messages', messages)
})


}


app.get('/',async(req, res) => {
	res.json({result:'heleh heleh heleh'})
	console.log('GET /')
})
app.get('/qr',async(req, res) => {
	var qrkod = await qrcode.toDataURL(conn.qr, { scale: 8 })
	var buffqr = await Buffer.from(qrkod.split('data:image/png;base64,')[1], 'base64')
	res.set("content-type",'image/png').send(buffqr)
})
makeConnection()

module.exports.conn = conn