import makeWASocket from '@adiwajshing/baileys-md'

async function connectToWhatsApp () {
    const conn = makeWASocket({
        // can provide additional config here
        printQRInTerminal: true
    })
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if(connection === 'open') {
            console.log('opened connection')
        }
    })
    sock.ev.on('messages.upsert', m => {
        console.log(JSON.stringify(m, null, 2))
        console.log('replying to', m.messages[0].key.remoteJid)
        sock.sendMessage(m.messages[0].key.remoteJid, msg, { text: 'Hello there!' })
    })
}
// run in main file
connectToWhatsApp()
