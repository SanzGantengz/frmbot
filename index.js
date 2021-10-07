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
const logger = require('pino')()
const { default: makeWASocket, default:create } = require('@adiwajshing/baileys-md')
const {
	WASocket, 
	AuthenticationState,
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

const loadState = () => {
        state = AuthenticationState || undefined
        try {
            var value = JSON.parse(
                readFileSync("./frmbot.json", { encoding: 'utf-8' }), 
                BufferJSON.reviver
            )
            state = { 
                creds: value.creds,
                keys: initInMemoryKeyStore(value.keys) 
            }
        } catch{  }
        return state
    }

const startSock = () => {
	const sock = makeWASocket({
		logger: logger.child({ level: 'trace' }),
		auth: loadState()
	})
	sock.ev.on('new.message', (mek) => {
 	   console.log(mek)
	})
	sock.ev.on('messages.upsert', (messages) => {
	    console.log('got messages', messages)
	})
	return sock
}
conn = startSock()

conn.ev.on('connection.update', async(update) => {
	const { connection, lastDisconnect, qr } = update
	console.log(JSON.stringify(update, null, 2))
    if (qr) {
		qrr = qr
		qrcode.toString(qr,{type:'terminal'}, function (err, url) {
			console.log(url)
		})
	}
	if (connection === 'close') {
        sock = startSock()
    }
    if (connection === 'open') return console.log('open')
})
conn.ev.on('auth-state.update', async () => {
    console.log (`credentials updated!`)
    authInfo = conn.authState
    var datasesi = JSON.stringify(authInfo, BufferJSON.replacer)
    await fs.writeFileSync(sesiname, datasesi)
})


app.get('/',async(req, res) => {
	res.json({result:'heleh heleh heleh'})
	console.log('GET /')
})
app.get('/qr',async(req, res) => {
	console.log('GET /qr')
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