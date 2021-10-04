import makeWASocket from '@adiwajshing/baileys-md'

async function connectToWhatsApp () {
    const conn = makeWASocket({
        printQRInTerminal: true
    })
    conn.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if(connection === 'close') {
            const shouldReconnect = (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
            if(shouldReconnect) {
                sock = startSock()
            }
        } else if(connection === 'open') {
            console.log('opened connection')
        }
    })
    conn.ev.on('messages.upsert', m => {
        console.log(JSON.stringify(m, undefined, 2))
        console.log('replying to', m.messages[0].key.remoteJid)
    })
}
// run in main file
connectToWhatsApp()
