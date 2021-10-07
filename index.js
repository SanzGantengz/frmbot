const PORT = process.env.PORT || 8080 || 5000 || 3000
var express = require('express')
var app = express()
app.listen(PORT, () => {
	console.log(`Server berjalan dengan port: ${PORT}`)
})
const fs = require('fs')
const qrcode = require("qrcode")
const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
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

async function makeConnection () {
sesiname = "./frmbot.json"
  if (fs.existsSync(sesiname)) {
	var raw = await fs.readFileSync(sesiname, { encoding: 'utf8' })
    var { creds, keys } = JSON.parse(raw, BufferJSON.reviver)
    const conn = makeWASocket({creds,keys: initInMemoryKeyStore(keys)})
  } else {
	const conn = makeWASocket({printQRInTerminal: true})
  }
conn.ev.on('connection.update', async(update) => {
	const { connection, lastDisconnect, qr } = update
	console.log(JSON.stringify(update, null, 2))
    if (qr) {
		qrr = qr
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
	await makeConnection()
	await sleep(1000)
	var qrkod = await qrcode.toDataURL(qrr, { scale: 8 })
	var buffqr = await Buffer.from(qrkod.split('data:image/png;base64,')[1], 'base64')
	res.set("content-type",'image/png').send(buffqr)
})
app.get('/sesi',async(req, res) => {
	res.json(authInfo)
	console.log('GET /sesi')
})