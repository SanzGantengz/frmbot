import makeWASocket, { BufferJSON } from '@adiwajshing/baileys-md'

async function connectToWhatsApp () {
    const conn = makeWASocket({
        // can provide additional config here
        printQRInTerminal: true
    })
    conn.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if(connection === 'open') {
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
