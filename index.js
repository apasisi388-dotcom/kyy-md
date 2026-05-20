const {
 default: makeWASocket,
 useMultiFileAuthState
} = require("@whiskeysockets/baileys")

async function startBot(){

 const { state, saveCreds } =
 await useMultiFileAuthState("session")

 const sock = makeWASocket({
   auth: state
 })

 sock.ev.on("creds.update", saveCreds)

 sock.ev.on("messages.upsert", async ({ messages }) => {

   const msg = messages[0]
   if(!msg.message) return

   const text =
   msg.message.conversation || ""

   const from = msg.key.remoteJid

   if(text == ".ping"){

     await sock.sendMessage(from,{
       text:"Pong 🏓"
     })

   }

 })

}

startBot()
