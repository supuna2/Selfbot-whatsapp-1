/**
* Originally by Hafizh
* Recoded by Lindow
* Premium fiture? contact me via WhatsApp
* Hayo ada tukang colong case nichh
**/
const
{
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   ChatModification,
   GroupSettingChange,
   waChatKey,
   mentionedJid,
   processTime,
} = require("@adiwajshing/baileys")
const qrcode = require("qrcode-terminal")
const moment = require("moment-timezone")
const fs = require("fs")
const axios = require('axios')
const imgbb = require('imgbb-uploader')
const brainly = require('brainly-scraper')
const imageToBase64 = require('image-to-base64')
const speed = require('performance-now')
const kagApi = require('@kagchi/kag-api')
const { color, bgcolor } = require('./lib/color')
const { sleep } = require('./lib/functionss')
const { textmenu } = require('./lib/textmenu')
const { virtex } = require('./src/virtex')
const base64Img = require('base64-img')
const fetch = require('node-fetch')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const { nsfwmenu } = require('./lib/nsfwmenu')
const { wait, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const videonye = JSON.parse(fs.readFileSync('./src/video/video.json'))
const tmp_hit = JSON.parse(fs.readFileSync('./src/tmp_hit.json'))
const audionye = JSON.parse(fs.readFileSync('./src/audio/audio.json'))
const badword = JSON.parse(fs.readFileSync('./src/group/badword.json'))
const bad = JSON.parse(fs.readFileSync('./src/group/bad.json'))
const setiker = JSON.parse(fs.readFileSync('./src/sticker/stik.json'))
const imagenye = JSON.parse(fs.readFileSync('./src/image/image.json'))
const welkom = JSON.parse(fs.readFileSync('./src/group/welkom.json'))
const antilink = JSON.parse(fs.readFileSync('./src/group/antilink.json'))
const option = JSON.parse(fs.readFileSync('./src/option.json'))
const {
    Lolkey,
    Nopalkey
} = option

const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:Lindow Amamiya\n' // Change To Your Name
            + 'ORG:Creator SELF BOT;\n'
            + 'TEL;type=CELL;type=VOICE;waid=6289513946766:+62 895-1394-6766\n' // CHANGE YOUR NUMBER
            + 'END:VCARD'

prefix = 'z'
thumbcr = 'https://i.ibb.co/K204t7H/6f4f3db9e1f1.jpg'
helpfoto = "https://i.ibb.co/m8xRvSz/fe5ce64951d8.jpg"
blocked = []
tmphit = []
cr = '_*LINDOWSELF - BOT*_'
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
const arrayBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const bulan = arrayBulan[moment().format('MM') - 1]

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
 
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  return `${pad(hours)}H ${pad(minutes)}Min ${pad(seconds)}Sec`
}
        function monospace(string) {
            return '```' + string + '```'
        }
        
const { exec } = require("child_process")

const lindow = new WAConnection()

lindow.on('qr', qr => {
   qrcode.generate(qr, { small: true })
   console.log(`[ ${time} ] QR code is ready`)
})

lindow.on('credentials-updated', () => {
   const authInfo = lindow.base64EncodedAuthInfo()
   console.log(`credentials updated!`)
   fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t'))
})

fs.existsSync('./session.json') && lindow.loadAuthInfo('./session.json')

lindow.connect();

lindow.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await lindow.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await lindow.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i.ibb.co/Tm93nGx/c5ad2a6c6daa.png'
				}
			    thu = await lindow.getStatus(anu.participants[0], MessageType.text)
				teks = `[ *NEW MEMBER IN ${mdata.subject}* ]\n\nUsername : @${num.split('@')[0]}\n\nBio : ${thu.status}\n\nApi number : wa.me/${num.split('@')[0]}\n\nWelcome @${num.split('@')[0]} 👋🏻`
				let buff = await getBuffer(ppimg)
				lindow.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'promote') {
			   try {
					ppimg = await lindow.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
			    var thu = await lindow.getStatus(anu.participants[0], MessageType.text)
			    num = anu.participants[0]
			    teks = `*❏ PROMOTE-DETECTED*\n\nUsername: @${num.split('@')[0]}\n\nBio : ${thu.status}\n\nDate: ${time} ${bulan} 2021\n\nGroup: ${mdata.subject}\n\nDon't break the rules!`
			   let buff = await getBuffer(ppimg)
			   lindow.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'demote') {
			   try {
					ppimg = 'https://i.ibb.co/26ht7ZQ/13a12686b543.png'
				} catch {
					ppimg = 'https://i.ibb.co/26ht7ZQ/13a12686b543.png'
				}
				thu = await lindow.getStatus(anu.participants[0], MessageType.text)
			   num = anu.participants[0]
			   teks = `*❏ DEMOTE-DETECTED*\n\nUsername: @${num.split('@')[0]}\n\nBio : ${thu.status}\n\nDate: ${time} ${bulan} 2021\n\nGroup: ${mdata.subject}\n\nPfft hahaha`
			   let buff = await getBuffer(ppimg)
			   lindow.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await lindow.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Byee @${num.split('@')[0]} `
				let buff = await getBuffer(ppimg)
				lindow.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
	lindow.on('CB:Blocklist', json => {
	if (blocked.length > 2) return
	for (let i of json[1].blocklist) {
		blocked.push(i.replace('c.us', 's.whatsapp.net'))}
    })
    lindow.on('message-new', async (lin) => {
		try {
			if (!lin.message) return
			if (lin.key && lin.key.remoteJid == 'status@broadcast') return
			global.prefix
			global.blocked
			const content = JSON.stringify(lin.message)
			const from = lin.key.remoteJid
			const type = Object.keys(lin.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
            const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			const isGroup = from.endsWith('@g.us')
		   // AUTO STICKER
		   /* if (isMedia && !lin.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo : lin
						const media = await lindow.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								lindow.sendMessage(from, `${err}`, MessageType.text)
							})
							.on('end', function () {
								console.log('Finish')
								lindow.sendMessage(from, fs.readFileSync(ran), sticker)
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
		                    }*/
			if (!lin.key.fromMe) return
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && lin.message.conversation.startsWith(prefix)) ? lin.message.conversation : (type == 'imageMessage') && lin.message.imageMessage.caption.startsWith(prefix) ? lin.message.imageMessage.caption : (type == 'videoMessage') && lin.message.videoMessage.caption.startsWith(prefix) ? lin.message.videoMessage.caption : (type == 'extendedTextMessage') && lin.message.extendedTextMessage.text.startsWith(prefix) ? lin.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? lin.message.conversation : (type === 'extendedTextMessage') ? lin.message.extendedTextMessage.text : ''
			var pes = (type === 'conversation' && lin.message.conversation) ? lin.message.conversation : (type == 'imageMessage') && lin.message.imageMessage.caption ? lin.message.imageMessage.caption : (type == 'videoMessage') && lin.message.videoMessage.caption ? lin.message.videoMessage.caption : (type == 'extendedTextMessage') && lin.message.extendedTextMessage.text ? lin.message.extendedTextMessage.text : ''
			var Link = (type === 'conversation' && lin.message.conversation) ? lin.message.conversation : (type == 'imageMessage') && lin.message.imageMessage.caption ? lin.message.imageMessage.caption : (type == 'videoMessage') && lin.message.videoMessage.caption ? lin.message.videoMessage.caption : (type == 'extendedTextMessage') && lin.message.extendedTextMessage.text ? lin.message.extendedTextMessage.text : ''
			const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
			const lindox = Link.slice(0).trim().split(/ +/).shift().toLowerCase()
            tmp_hit.push(command)
		    fs.writeFileSync('./src/tmp_hit.json', JSON.stringify(tmp_hit))
		    tmphit.push(command)
			mess = {
				wait: 'Loading...',
				success: '️success ',
				error: {
					stick: 'error',
					Iv: 'Link ga valid'
				},
				only: {
					group: 'only for groups',
					ownerG: 'only for owner group',
					ownerB: 'only for owner bot',
					admin: 'only for admin group',
					Badmin: 'only admin'
				}
			}
			const botNumber = lindow.user.jid
			const sender = isGroup ? lin.participant : lin.key.remoteJid
			const ownerNumber = ["79610148941@s.whatsapp.net","13092046444@s.whatsapp.net"] // Change To Your Number
			const isAntiLink = isGroup ? antilink.includes(from) : false
            pushname = lindow.contacts[sender] != undefined ? lindow.contacts[sender].vname || lindow.contacts[sender].notify : undefined
			const groupMetadata = isGroup ? await lindow.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const tescuk = ["0@s.whatsapp.net"]
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false 
            const isBadWord = isGroup ? badword.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				lindow.sendMessage(from, teks, text, {quoted:lin})
			}
			const sendMess = (hehe, teks) => {
				lindow.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? lindow.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : lindow.sendMessage(from, teks.trim(), extendedText, {quoted: lin, contextInfo: {"mentionedJid": memberr}})
			}
			const sendImage = (teks) => {
		    lindow.sendMessage(from, teks, image, {quoted:lin})
		    }
            const costum = (pesan, tipe, target, target2) => {
			lindow.sendMessage(from, pesan, tipe, {quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` }}})
			}
            if (isGroup && isBadWord) {
            if (bad.includes(messagesC)) {
                if (!isGroupAdmins) {
                    return reply("badword detected, please don't badword")
                        .then(() => lindow.groupRemove(from, sender))
                        .then(() => {
                            lindow.sendMessage(from, `*「 ANTI BADWORD 」*\nKamu dikick karena berkata kasar!`, text ,{quoted: lin})
                        }).catch(() => lindow.sendMessage(from, `status admin : no\nDon't kick member`, text , {quoted : lin}))
                } else {
                    return reply( "please don't badword")
                }
            }
        }
			if (messagesC.includes("://chat.whatsapp.com/")){
		        if (!isGroup) return
		        if (!isAntiLink) return
		        if (isGroupAdmins) return reply('karena kamu adalah admin group, bot tidak akan kick kamu')
		        lindow.updatePresence(from, Presence.composing)
		        if (messagesC.includes("#izinadmin")) return reply("#izinadmin diterima")
		        var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		        reply(`Link Group Terdeteksi maaf ${sender.split("@")[0]} anda akan di kick dari group 5detik lagi`)
		        setTimeout( () => {
			        lindow.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		        }, 5000)
		        setTimeout( () => {
			        lindow.updatePresence(from, Presence.composing)
			        reply("1detik")
		        }, 4000)
		        setTimeout( () => {
			        lindow.updatePresence(from, Presence.composing)
		                reply("2detik")
		        }, 3000)
		        setTimeout( () => {
			        lindow.updatePresence(from, Presence.composing)
			        reply("3detik")
		        }, 2000)
		        setTimeout( () => {
			        lindow.updatePresence(from, Presence.composing)
			        reply("4detik")
		        }, 1000)
		        setTimeout( () => {
			        lindow.updatePresence(from, Presence.composing)
			        reply("5detik")
		        }, 0)
	        }
			colors = ['red','white','black','blue','yellow','green']
		    if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mPRIVATE\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mGROUP\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			switch(command) {
				case 'rptag':
                    if (lin.message.extendedTextMessage === undefined || lin.message.extendedTextMessage === null) return reply("Gada yang di tag")
                    mentioned = lin.message.extendedTextMessage.contextInfo.mentionedJid
                    teks = "*Repeat Tag*"
                    teks += "\n\n"
                    members_id = []
                    for (let z = 0; z < 2000; z++) {
                        teks += ` @${mentioned[0].split("@")[0]}`
                        members_id.push(mentioned[0])
                    }
                    mentions(teks, members_id, true)
                    break
			case 'sfire':
             var imgbb = require('imgbb-uploader')
                                        if ((isMedia && !lin.message.videoMessage || isQuotedImage) && args.length == 0) {
                                        ger = isQuotedImage ? JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo : lin
                                        reply(mess.wait)
                                        owgi = await lindow.downloadAndSaveMediaMessage(ger)
                                        anu = await imgbb("e7cdf2c7806ce29fc366e6cc0380a23f", owgi)
                                        teks = `${anu.display_url}`
                                        ranpll = getRandom('.gif')
                                        ranoll = getRandom('.webp')
                                        anu1ll = await fetchJson(`https://api.zeks.xyz/api/sfire?img=${teks}&apikey=apivinz`,{method:'get'})                   
                      exec(`wget ${anu1ll.result} -O ${ranpll} && ffmpeg -i ${ranpll} -vcodec libwebp -filter:v fps=fps=10 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranoll}`, (err) => {                     
                                                fs.unlinkSync(ranpll)
                                                if (err) return reply(mess.error.stick)
                                                buffer = fs.readFileSync(ranoll)
                                                lindow.sendMessage(from, buffer, sticker, { contextInfo: { participant: '0@s.whatsapp.net', quotedMessage: { conversation: '*_STICKER FIRE_*' } } }) 
                                                fs.unlinkSync(ranoll)
                                        })                                   
                                             } else {
                                                reply('Gunakan foto!')
                                          }           
                                          break
			case 'alquran':
                    if (args.length < 1) return reply('Example: !alquran 108')
                    urls = `http://api.lolhuman.xyz/api/quran/${args[0]}?apikey=${Lolkey}`
                    quran = await fetchJson(urls)
                    result = quran.result
                    ayat = result.ayat
                    txt = `QS. ${result.surah} : 1-${ayat.length}\n\n`
                    for (var x in ayat) {
                        test = ayat[x]
                        arab = test.arab
                        nomor = test.ayat
                        latin = test.latin
                        indo = test.indonesia
                        txt += `${arab}\n${nomor}. ${latin}\n${indo}\n\n`
                    }
                    txt = txt.replace(/<u>/g, "").replace(/<\/u>/g, "")
                    txt = txt.replace(/<strong>/g, "").replace(/<\/strong>/g, "")
                    txt = txt.replace(/<u>/g, "").replace(/<\/u>/g, "")
                    reply(txt)
                    break
			case 'listonline':
        		let ido = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from
			    let online = [...Object.keys(lindow.chats.get(ido).presences), lindow.user.jid]
			    lindow.sendMessage(from, 'List Online:\n' + online.map(v => '- @' + v.replace(/@.+/, '')).join`\n`, text, { quoted: lin,
  			  contextInfo: { mentionedJid: online }
			    })
				break 
			case 'typing':
			     lindow.updatePresence(from, Presence.composing)
			     if (args[1]=="stop")
			     lindow.updatePresence(from, Presence.paused)
			    break
			case 'unread?':
			    const unread = await lindow.loadAllUnreadMessages()
			    lindow.sendMessage("6289513946766@s.whatsapp.net", `unread message count : *${unread.length}*`, MessageType.text)
			    break
			case 'pin':
                reply('premium, contact me via WhatsApp')
                break
            case 'unpin':
                reply('premium, contact me via WhatsApp')
                break
            case 'mute':
                reply('premium, contact me via WhatsApp')
                break
            case 'unarchive':
                reply('premium, contact me via WhatsApp')
                break
            case 'archive':
                reply('premium, contact me via WhatsApp')
                break
            case 'unmute':
                reply('premium, contact me via WhatsApp')
                break
            case 'delchat':
                reply('*succes delete this chat*')
                console.log('succes delete chat = ' + from)
                await sleep(4000)
                lindow.modifyChat(from, ChatModification.delete)
                break
		    case 'antidelete':
				reply('premium, contact me via WhatsApp')
				break
			case 'jadwaltv':
            channel = args[0]
            tvnow = await fetchJson(`http://api.lolhuman.xyz/api/jadwaltv/${channel}?apikey=${Lolkey}`, {method: 'get'})
            tvnow = tvnow.result
            txt = `Jadwal TV ${channel.toUpperCase()}\n\n`
           for (var x in tvnow) {
              txt += `${x} - ${tvnow[x]}\n`
            }
            reply(txt)
            break
			case 'swm':
		    var Exif = require(process.cwd() + '/exif.js')
            var exif = new Exif()
            var stickerWm = (media, packname, author) => {
            ran = getRandom('.webp')
            exif.create(packname, author, from.split("@")[0])
            exec(`webpmux -set exif ./temp/${from.split("@")[0]}.exif ./${media} -o ./${ran}`, (err, stderr, stdout) => {
            if (err) return lindow.sendMessage(from, String(err), text, { quoted: lin })
            lindow.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: lin})
        })
    }
    if ((isMedia && !isQuotedVideo || isQuotedImage) && args.length >= 0) {
               var mediaEncrypt = isQuotedImage ? JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo : lin
               var mediaFinalys = await lindow.downloadAndSaveMediaMessage(mediaEncrypt, 'dlstikerwm')
               var kls = body.slice(5)
			   var has = kls.split("|")[0];
			   var kas = kls.split("|")[1];
               var packageName = `${has}`
               var packageAuthor = `${kas}`
               var exifName = 'stikerwm.exif',
                   webpName = `${from.split(/@/)[0]}.webp`
               try {
                   exec(`cwebp -q 50 dlstikerwm.jpeg -o ${webpName}`, (e, stderr, stdout) => {
                       if (e) return reply(from, String(stderr))
                           stickerWm(webpName, packageName, packageAuthor)
                   })
               } catch (e) {
                   throw e
               }
           }
                break
        case 'takestick':
        reply('premium, contact me via WhatsApp')
        break
			    case 'telesticker':
                    ini_url = args[0]
                    ini_url = await fetchJson(`http://api.lolhuman.xyz/api/telestick?apikey=${Lolkey}&url=${ini_url}`)
                    ini_sticker = ini_url.result.sticker
                    for (sticker_ in ini_sticker) {
                        buffer = await getBuffer(ini_sticker[sticker_])
                        lindow.sendMessage(from, buffer, sticker)
                    }
                    break
                case 'googleimg':
                    ini_url = args[0]
                    ini_url = await fetchJson(`http://api.lolhuman.xyz/api/gimage2?apikey=${Lolkey}&query=${ini_url}`)
                    ini_sticker = ini_url.result
                    for (sticker_ in ini_sticker) {
                        buffer = await getBuffer(ini_sticker[sticker_])
                        lindow.sendMessage(from, buffer, image, {quoted: lin})
                    }
                    break
			    case 'tinyurl':
				const tinyurl = body.slice(9)
				var itsme = `0@s.whatsapp.net`
				var split = `*URL SHORTENER*`
				// var taged = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
				const srotlink = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				axios.get(`https://tobz-api.herokuapp.com/api/tinyurl?url=${tinyurl}&apikey=BotWeA`).then((res) => {
					let hasil = `${res.data.result}`;
					lindow.sendMessage(from, hasil, MessageType.text, srotlink)
				})
				break
				case 'blackpink':
                case 'neon':
                case 'greenneon':
                case 'advanceglow':
                case 'futureneon':
                case 'sandwriting':
                case 'sandsummer':
                case 'sandengraved':
                case 'metaldark':
                case 'neonlight':
                case 'holographic':
                case 'text1917':
                case 'minion':
                case 'deluxesilver':
                case 'newyearcard':
                case 'bloodfrosted':
                case 'halloween':
                case 'jokerlogo':
                case 'fireworksparkle':
                case 'natureleaves':
                case 'bokeh':
                case 'toxic':
                case 'strawberry':
                case 'box3d':
                case 'roadwarning':
                case 'breakwall':
                case 'icecold':
                case 'luxury':
                case 'cloud':
                case 'summersand':
                case 'horrorblood':
                case 'thunder':
                case 'christmas':
                    if (args.length == 0) return reply(`Usage: ${prefix + command} text\nExample: ${prefix + command} lindow`)
                    txt = args.join(" ")
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/textprome/${command}?apikey=${Lolkey}&text=${txt}`)
                    lindow.sendMessage(from, buffer, image, { quoted: lin })
                    break
			     case 'antilink':
					if (args.length < 1) return reply('type 1 to activate the antilink feature')
					if (Number(args[0]) === 1) {
						if (isAntiLink) return reply('anti link group is active')
						antilink.push(from)
						fs.writeFileSync('./src/group/antilink.json', JSON.stringify(antilink))
						reply('Success activate antilink group in this group')
						lindow.sendMessage(from,`Attention to all member, antilink active, if you send a group link, you will be kicked from the group`, text)
					} else if (Number(args[0]) === 0) {
						if (!isAntiLink) return reply('Antilink status : disable')
						var ini = antilink.indexOf(from)
						antilink.splice(ini, 1)
						fs.writeFileSync('./src/group/antilink.json', JSON.stringify(antilink))
						reply('Success disable antilink group in this group')
					} else {
						reply('1 to activate, 0 to deactivate')
					}
					break
                case 'tiktokstalk':
                    user = body.slice(13)
                    data = await fetchJson(`http://api.lolhuman.xyz/api/stalktiktok/${user}?apikey=${Lolkey}`, {method: 'get'})
                    teks = `*Username :* ${data.result.username}\n\n*Nickname :* ${data.result.nickname}\n\n*Bio :* ${data.result.bio}\n\n*Followers :* ${data.result.followers}\n\n*Following :* ${data.result.followings}\n\n*Like count :* ${data.result.likes}\n\n*Video count :* ${data.result.video}`
                    pp = await getBuffer(data.result.user_picture)
                    lindow.sendMessage(from, pp, image, {quoted: lin, caption: teks})
                    break
			    case 'getvid':
				namastc = body.slice(10)
				buffer = fs.readFileSync(`./src/video/${namastc}.mp4`)
				lindow.sendMessage(from, buffer, video, { mimetype: 'video/mp4', quoted: lin })
				break
                case 'listvideo':
			case 'videolist':
				teks = '*List Video :*\n\n'
				for (let awokwkwk of videonye) {
					teks += `- ${awokwkwk}\n`
				}
				teks += `\n*Total : ${videonye.length}*`
				lindow.sendMessage(from, teks.trim(), extendedText, { quoted: lin, contextInfo: { "mentionedJid": videonye } })
				break
			    case 'addvideo':
				if (!isQuotedVideo) return reply('Reply the video!')
				svst = body.slice(10)
				if (!svst) return reply('name the video?')
				boij = JSON.parse(JSON.stringify(lin).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await lindow.downloadMediaMessage(boij)
				videonye.push(`${svst}`)
				fs.writeFileSync(`./src/video/${svst}.mp4`, delb)
				fs.writeFileSync('./src/video/video.json', JSON.stringify(videonye))
				lindow.sendMessage(from, `Succses add video\n${prefix}listvideo to see the list`, MessageType.text, { quoted: lin })
				break
			    case 'linkgc':
				var itsme = `0@s.whatsapp.net`
				var split = `${cr}`
				const linkgcgan = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				const linkgc = await lindow.groupInviteCode(from)
				lindow.sendMessage(from, `https://chat.whatsapp.com/${linkgc}`, MessageType.text, linkgcgan)
				break
                case 'urltoimg':
                    te = body.slice(10)
                    ttt = await getBuffer(te)
                    lindow.sendMessage(from, ttt, image, {quoted: lin})
                    break
			    case 'help':
			    case 'h':
			    case '?':
			    case 'menu':
			    const a ='```'
			    me = lindow.user
			    const help2 = `
𝐋𝐈𝐍𝐃𝐎𝐖 𝐒𝐄𝐋𝐅𝐁𝐎𝐓 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏

Hii ${me.name}

Total hit : *${tmp_hit.length}*

Hit today : *${tmphit.length}*

❏ Information
  │ Version : 「 1.0  」 
  │ System : 「 Baileys 」 

❏ System menu
  │ ● *${prefix}upname* newname
  │ ● *${prefix}afk* reason
  │ ● *${prefix}help*
  │ ● *${prefix}eval* 
  │ ● *${prefix}term*
  │ ● *${prefix}timer*
  │ ● *${prefix}facematching* replyimg
  │ ● *${prefix}return*
  │ ● *${prefix}shutdown*
  │ ● *${prefix}bc* text
  │ ● *${prefix}speed*
  │ ● *${prefix}unread?*
  │ ● *${prefix}pin*
  │ ● *${prefix}unpin*
  │ ● *${prefix}mute*
  │ ● *${prefix}unmute*
  │ ● *${prefix}archive*
  │ ● *${prefix}unarchive*
  │ ● *${prefix}delchat*
  │ ● *${prefix}tes* 
  │ ● *${prefix}getbio* tag
  │ ● *${prefix}getpict* tag
  │ ● *${prefix}upstory* text
  │ ● *${prefix}upstorypic* reply
  │ ● *${prefix}upstoryvid* reply
  │ ● *${prefix}hidetag* text
  │ ● *${prefix}stikertag* reply
  │ ● *${prefix}rptag* tag
  │ ● *${prefix}stikertag2* optional
  │ ● *${prefix}antidelete* enable/disable
  │ ● *${prefix}antidelete* ctenable/ctdisable
  │ ● *${prefix}swm* author│pack
  │ ● *${prefix}sfire*
  │ ● *${prefix}imagetag*
  │ ● *${prefix}fakereply* grouponly
  │ ● *${prefix}fakereply2* contact
  │ ● *${prefix}fakereply3* contact
  │ ● *${prefix}fakedeface* url
  │ ● *${prefix}fakedef* reply
  │ ● *${prefix}fakedeface2* url│title│desc
  │ ● *${prefix}fakeimg* optional
  │ ● *${prefix}addsticker* optional
  │ ● *${prefix}getsticker* optional
  │ ● *${prefix}liststicker*
  │ ● *${prefix}addvn* optional
  │ ● *${prefix}getvn* optional
  │ ● *${prefix}listvn*
  │ ● *${prefix}addimage* optional
  │ ● *${prefix}getimage* optional
  │ ● *${prefix}listimage*
  │ ● *${prefix}addvideo* optional
  │ ● *${prefix}getvid* optional
  │ ● *${prefix}listvideo* 
  │ ● *${prefix}readmore* text1│text2
  │ ● *${prefix}setprefix* newprefix
  │ ● *${prefix}setthumb* replypic
  │ ● *${prefix}sethelpimg* replypic
  │ ● *${prefix}setreply* newtextreply
  │ ● *${prefix}fordward* text
  │ ● *${prefix}setstatus* text
  │ ● *${prefix}fordward1* text
  │ ● *${prefix}readall*
  │ ● *${prefix}unreadall*
  │ ● *${prefix}setpp* reply
  │ ● *${prefix}me*
  │ ● *${prefix}tagme*
  │ ● *${prefix}simi*
  │ ● *${prefix}virtex*
  │ ● *${prefix}chat* number
  │ ● *${prefix}runtime2*
  │ ● *${prefix}runtime*
  
❏ Islami menu
  │ ● *${prefix}alquran

❏ Tools menu
  │ ● *${prefix}pastebin* yourtext
  │ ● *${prefix}encbinary* yourtext
  │ ● *${prefix}decbinary* yourtext
  │ ● *${prefix}dorking* yourtext
  │ ● *${prefix}encode64* yourtext
  │ ● *${prefix}decode64* yourtext
  │ ● *${prefix}encode32* yourtext
  │ ● *${prefix}decode32* yourtext
  │ ● *${prefix}encoctal* yourtext
  │ ● *${prefix}becrypt* yourtext

❏ Spam menu
  │ ● *${prefix}spamcall* 62859289xxx
  │ ● *${prefix}spam1* 628xxx (sms)
  │ ● *${prefix}spam2* 628xxx (sms)
  │ ● *${prefix}spam3* 628xxx (sms)
  │ ● *${prefix}spam4* 628xxx (sms)
  │ ● *${prefix}spam5* 628xxx (sms)
  │ ● *${prefix}spam6* 628xxx (sms)
  │ ● *${prefix}spam7* 628xxx (sms)
  │ ● *${prefix}spam8* 628xxx (sms)
  
❏ Media menu
  │ ● *${prefix}hilih* text
  │ ● *${prefix}holoh* text
  │ ● *${prefix}pussy*
  │ ● *${prefix}moddroid* optional
  │ ● *${prefix}happymod* optional
  │ ● *${prefix}tabok*
  │ ● *${prefix}terbalik* text
  │ ● *${prefix}huruf* text
  │ ● *${prefix}kiss*
  │ ● *${prefix}ttp* text
  │ ● *${prefix}attp* text
  │ ● *${prefix}nsfwgif*

❏ Sound menu
  │ ● *${prefix}toptt* replyaudio
  │ ● *${prefix}bass* replyaudio
  │ ● *${prefix}slow* replyaudio
  │ ● *${prefix}chipmunk* replyaudio
  │ ● *${prefix}fatsound* replyaudio
  │ ● *${prefix}tts* code yourtext
  │ ● *${prefix}citacita*
  
❏ Random menu
  │ ● *${prefix}randomporn*
  │ ● *${prefix}randomhorror*
  │ ● *${prefix}asupan*
  │ ● *${prefix}berita*
  │ ● *${prefix}randomanime*
  │ ● *${prefix}quotes*
  │ ● *${prefix}quotesnime*
  │ ● *${prefix}katailham*
  │ ● *${prefix}nekonime*
  │ ● *${prefix}randomquran*
  │ ● *${prefix}fml*
  │ ● *${prefix}bucin*
  │ ● *${prefix}other*

❏ Downloader menu
  │ ● *${prefix}telesticker* url
  │ ● *${prefix}scplay* query
  │ ● *${prefix}googleimg* query
  │ ● *${prefix}soundcloud* link
  │ ● *${prefix}facebook* link
  │ ● *${prefix}pinterestdl* link
  │ ● *${prefix}phdl* link
  │ ● *${prefix}xnxxsearch* query
  │ ● *${prefix}xnxx* link
  │ ● *${prefix}igdl* link
  │ ● *${prefix}igstory* username
  │ ● *${prefix}ighl* username
  │ ● *${prefix}tiktok* link
  │ ● *${prefix}tinyurl* link
  │ ● *${prefix}ytmp3* link
  │ ● *${prefix}ytmp4* link
  │ ● *${prefix}ytsearch* query
  │ ● *${prefix}play* query
  │ ● *${prefix}playvideo* query
  │ ● *${prefix}joox* query
  │ ● *${prefix}clone* tagmember
  │ ● *${prefix}emoji* emoji

❏ Search menu
  │ ● *${prefix}cuaca* query
  │ ● *${prefix}map* query
  │ ● *${prefix}whatanime* replyimg
  │ ● *${prefix}nhentai* kode
  │ ● *${prefix}nhentaipdf* kode
  │ ● *${prefix}drakor* query
  │ ● *${prefix}kusonimesearch* query
  │ ● *${prefix}kusonime* link
  │ ● *${prefix}jooxf* query
  │ ● *${prefix}igstalk* username
  │ ● *${prefix}wallpaper*
  │ ● *${prefix}jadwaltvnow*
  │ ● *${prefix}jadwaltv* query
  │ ● *${prefix}jadwalsholat* daerah
  │ ● *${prefix}github* username
  │ ● *${prefix}xvideos* query
  │ ● *${prefix}lirik* query
  │ ● *${prefix}pinterest* query
  │ ● *${prefix}wiki* query
  │ ● *${prefix}film* query
  
❏ Image menu
  │ ● *${prefix}carbon* text
  │ ● *${prefix}qrcode* text
  │ ● *${prefix}qrreader* replyimg
  │ ● *${prefix}imgbb* reply
  │ ● *${prefix}urltoimg* url
  │ ● *${prefix}toimg* replysticker
  │ ● *${prefix}ssweb* link
  │ ● *${prefix}nulis* text
  │ ● *${prefix}sticker* replyimg
  │ ● *${prefix}stickergif* replyvid
  │ ● *${prefix}harta* text
  │ ● *${prefix}meme*
  │ ● *${prefix}picmeme* text1│text2
  │ ● *${prefix}memeind*
  │ ● *${prefix}darkjoke*
  │ ● *${prefix}puisi*
  
❏ Group menu
  │ ● *${prefix}group*
  │ ● *${prefix}cgc* title│number
  │ ● *${prefix}promote* tagmember
  │ ● *${prefix}demote* tagmember
  │ ● *${prefix}add* number
  │ ● *${prefix}setnamegc* text
  │ ● *${prefix}setdesc* text
  │ ● *${prefix}kick* tagmember
  │ ● *${prefix}kicktime* tagmember
  │ ● *${prefix}listadmin*
  │ ● *${prefix}linkgc*
  │ ● *${prefix}antilink* 1/0
  │ ● *${prefix}nobadword* enable/disable
  │ ● *${prefix}addbadword* badword
  │ ● *${prefix}delbadword* badword
  │ ● *${prefix}listbadword*
  │ ● *${prefix}tagall*
  │ ● *${prefix}tagall2*
  │ ● *${prefix}tagall3*
  │ ● *${prefix}ownergc*
  │ ● *${prefix}leave*
  │ ● *${prefix}setpp* replyimg

❏ Textprome menu
  │ ● *${prefix}blackpink* yourtext
  │ ● *${prefix}neon* yourtext
  │ ● *${prefix}greenneon* yourtext
  │ ● *${prefix}advanceglow* yourtext
  │ ● *${prefix}futureneon* yourtext
  │ ● *${prefix}sandwriting* yourtext
  │ ● *${prefix}sandsummer* yourtext
  │ ● *${prefix}sandengraved* yourtext
  │ ● *${prefix}metaldark* yourtext
  │ ● *${prefix}neonlight* yourtext
  │ ● *${prefix}holographic* yourtext
  │ ● *${prefix}text1917* yourtext
  │ ● *${prefix}minion* yourtext
  │ ● *${prefix}deluxesilver* yourtext
  │ ● *${prefix}newyearcard* yourtext
  │ ● *${prefix}bloodfrosted* yourtext
  │ ● *${prefix}halloween* yourtext
  │ ● *${prefix}jokerlogo* yourtext
  │ ● *${prefix}fireworksparkle* yourtext
  │ ● *${prefix}natureleaves* yourtext
  │ ● *${prefix}bokeh* yourtext
  │ ● *${prefix}toxic* yourtext
  │ ● *${prefix}strawberry* yourtext
  │ ● *${prefix}box3d* yourtext
  │ ● *${prefix}roadwarning* yourtext
  │ ● *${prefix}breakwall* yourtext
  │ ● *${prefix}icecold* yourtext
  │ ● *${prefix}luxury* yourtext
  │ ● *${prefix}cloud* yourtext
  │ ● *${prefix}summersand* yourtext
  │ ● *${prefix}horrorblood* yourtext
  │ ● *${prefix}thunder* yourtext
  │ ● *${prefix}christmas* yourtext


❏ Photooxy
  │ ● *${prefix}shadow*
  │ ● *${prefix}cup*
  │ ● *${prefix}cup1*
  │ ● *${prefix}romance*
  │ ● *${prefix}smoke*
  │ ● *${prefix}burnpaper*
  │ ● *${prefix}lovemessage*
  │ ● *${prefix}undergrass*
  │ ● *${prefix}love*
  │ ● *${prefix}coffe*
  │ ● *${prefix}woodheart*
  │ ● *${prefix}flowerheart*
  │ ● *${prefix}woodenboard*
  │ ● *${prefix}summer3d*
  │ ● *${prefix}wolfmetal*
  │ ● *${prefix}nature3d*
  │ ● *${prefix}underwater*
  │ ● *${prefix}golderrose*
  │ ● *${prefix}summernature*
  │ ● *${prefix}letterleaves*
  │ ● *${prefix}glowingneon*
  │ ● *${prefix}fallleaves*
  │ ● *${prefix}flamming*
  │ ● *${prefix}harrypotter*
  │ ● *${prefix}carvedwood*

❏ Ephoto menu
  │ ● *${prefix}phkomen*
  │ ● *${prefix}battlefield*
  │ ● *${prefix}8bit*
  │ ● *${prefix}pubg*
  │ ● *${prefix}bannerlol*
  │ ● *${prefix}royal*
  │ ● *${prefix}valo*
  │ ● *${prefix}wanted*
  │ ● *${prefix}cod*
  │ ● *${prefix}wetglass*
  │ ● *${prefix}multicolor3d*
  │ ● *${prefix}watercolor*
  │ ● *${prefix}luxurygold*
  │ ● *${prefix}galaxywallpaper*
  │ ● *${prefix}lighttext*
  │ ● *${prefix}beautifulflower*
  │ ● *${prefix}puppycute*
  │ ● *${prefix}royaltext*
  │ ● *${prefix}heartshaped*
  │ ● *${prefix}birthdaycake*
  │ ● *${prefix}galaxystyle*
  │ ● *${prefix}hologram3d*
  │ ● *${prefix}greenneon*
  │ ● *${prefix}glossychrome*
  │ ● *${prefix}greenbush*
  │ ● *${prefix}metallogo*
  │ ● *${prefix}noeltext*
  │ ● *${prefix}glittergold*
  │ ● *${prefix}textcake*
  │ ● *${prefix}starsnight*
  │ ● *${prefix}wooden3d*
  │ ● *${prefix}textbyname*
  │ ● *${prefix}writegalacy*
  │ ● *${prefix}galaxybat*
  │ ● *${prefix}snow3d*
  │ ● *${prefix}birthdayday*
  │ ● *${prefix}goldplaybutton*
  │ ● *${prefix}silverplaybutton*
  │ ● *${prefix}freefire*
 
 ❏ Photo effect
  │ ● *${prefix}trigger* reply
  │ ● *${prefix}pencil* reply
  │ ● *${prefix}fisheye* reply
  │ ● *${prefix}wasted* reply
  │ ● *${prefix}phcostum* reply
  │ ● *${prefix}wineffect* reply
  │ ● *${prefix}zoomffect* reply
  │ ● *${prefix}distortion* reply
  │ ● *${prefix}negative* reply
  │ ● *${prefix}nightvision* reply
  │ ● *${prefix}cartoon* reply
  │ ● *${prefix}fire* reply
  │ ● *${prefix}graviti* reply
  │ ● *${prefix}comic* reply

 ❏ NSFW menu
  │ ● *${prefix}nsfwmenu*
  
Template by : Noire`
            xxx = await getBuffer(helpfoto)
            xxxx = await getBuffer(thumbcr)
            runtime = process.uptime()
            lindow.sendMessage(from, xxx, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "videoMessage":{"mimetype":"video/mp4","caption":"*PELER KUDA*","jpegThumbnail":xxxx}}}, contextInfo: { forwardingScore: 508, isForwarded: true }, caption: help2})
                    break
                case 'spam1':
                case 'spam2':
                case 'spam3':
                case 'spam4':
                case 'spam5':
                case 'spam6':
                case 'spam7':
                case 'spam8':
                    buffer = await fetchJson(`http://api.lolhuman.xyz/api/sms/${command}?apikey=${Lolkey}&nomor=${body.slice(7)}`, {method: 'get'})
                    reply(buffer.result)
                    break
                case 'nsfwmenu':
                    var punya_wa = "0@s.whatsapp.net"
                    var ini_text = "NSFW MENU"
                    var buffer = await getBuffer("https://i.ibb.co/JdfQ73m/photo-2021-02-05-10-13-39.jpg")
                    const ini_csreply = {
                        contextInfo: {
                            stanzaId: 'B826873620DD5947E683E3ABE663F263',
                            participant: punya_wa,
                            remoteJid: 'status@broadcast',
                            quotedMessage: {
                                imageMessage: {
                                    caption: ini_text,
                                    jpegThumbnail: buffer
                                }
                            }
                        }
                    }
                    lindow.sendMessage(from, nsfwmenu(prefix), text, ini_csreply)
                    break
                case 'dorking':
			    dork = `${body.slice(9)}`
					anu = await fetchJson(`https://api-anoncybfakeplayer.herokuapp.com/dorking?dork=${dork}`, {method: 'get'})
					var ko = '1'
					for (let i = 0; i < anu.result.length; i++) { 
					 teks = `${ko}\n${anu.result[i]}`
					 ko++
					}
					reply(teks)
					break
			    case 'wetglass':
                case 'multicolor3d':
                case 'watercolor':
                case 'luxurygold':
                case 'galaxywallpaper':
                case 'lighttext':
                case 'beautifulflower':
                case 'puppycute':
                case 'royaltext':
                case 'heartshaped':
                case 'birthdaycake':
                case 'galaxystyle':
                case 'hologram3d':
                case 'greenneon':
                case 'glossychrome':
                case 'greenbush':
                case 'metallogo':
                case 'noeltext':
                case 'glittergold':
                case 'textcake':
                case 'starsnight':
                case 'wooden3d':
                case 'textbyname':
                case 'writegalacy':
                case 'galaxybat':
                case 'snow3d':
                case 'birthdayday':
                case 'goldplaybutton':
                case 'silverplaybutton':
                case 'freefire':
                    if (args.length == 0) return reply(`Usage: ${prefix + command} text\nExample: ${prefix + command} lindow`)
                    txt = args.join(" ")
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/ephoto1/${command}?apikey=${Lolkey}&text=${txt}`)
                    lindow.sendMessage(from, buffer, image, { quoted: lin })
                    break
		        case 'shadow':
                case 'cup':
                case 'cup1':
                case 'romance':
                case 'smoke':
                case 'burnpaper':
                case 'lovemessage':
                case 'undergrass':
                case 'love':
                case 'coffe':
                case 'woodheart':
                case 'flowerheart':
                case 'woodenboard':
                case 'summer3d':
                case 'wolfmetal':
                case 'nature3d':
                case 'underwater':
                case 'golderrose':
                case 'summernature':
                case 'letterleaves':
                case 'glowingneon':
                case 'fallleaves':
                case 'flamming':
                case 'harrypotter':
                case 'carvedwood':
                    if (args.length == 0) return reply(`Usage: ${prefix + command} text\nExample: ${prefix + command} lindow`)
                    txt = args.join(" ")
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/photooxy1/${command}?apikey=${Lolkey}&text=${txt}`)
                    lindow.sendMessage(from, buffer, image, { quoted: lin })
                    break
          case 'fatsound':
					encmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lindow.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=1.6,asetrate=22100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						lindow.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: lin})
						fs.unlinkSync(ran)
					})
				break
                case 'chipmunk':
					encmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lindow.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.5,asetrate=65100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						lindow.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: lin})
						fs.unlinkSync(ran)
					})
				break
                case 'slow':
				encmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
				media = await lindow.downloadAndSaveMediaMessage(encmedia)
				ran = getRandom('.mp3')
				exec(`ffmpeg -i ${media} -filter:a "atempo=0.8,asetrate=45000" ${ran}`, (err, stderr, stdout) => {
				fs.unlinkSync(media)
				if (err) return reply('Error!')
				uhh = fs.readFileSync(ran)
				lindow.sendMessage(from, uhh, audio, {mimetype: 'audio/mp4', ptt:true, quoted: lin})
				fs.unlinkSync(ran)
				})
				break
                case 'tagme':
                var blk = body.slice(7)
			    me = lindow.user
				const tagg = {
					text: `@${me.jid.split('@')[0]} ${blk}`,
					contextInfo: { mentionedJid: [me.jid] }
				}
				lindow.sendMessage(from, tagg, text, { quoted: lin })
				break
                case 'term':
				const cmde = body.slice(6)
				var itsme = `0@s.whatsapp.net`
				var split = `*EXECUTOR*`
				const term = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				exec(cmde, (err, stdout) => {
					if (err) return lindow.sendMessage(from, `root@Nfz.01:~ ${err}`, text, { quoted: lin })
					if (stdout) {
						lindow.sendMessage(from, stdout, text, term)
					}
				})
				break
                case 'fakedeface2':
                reply('premium, contact me via WhatsApp')
                break
                case 'fakedef':
                                reply('premium, contact me via WhatsApp')
                                break
                case 'randomporn':
				lindow.updatePresence(from, Presence.composing) 
				 data = fs.readFileSync('./src/group/18.js');
                 jsonData = JSON.parse(data);
                 randIndex = Math.floor(Math.random() * jsonData.length);
                 randKey = jsonData[randIndex];
                 randBokep = await getBuffer(randKey.image)
                 reply('Wait..')
                 randTeks = randKey.teks
                 lindow.sendMessage(from, randBokep, image, {quoted: lin, caption: randTeks})
                break
                case 'listvn':
			    case 'vnlist':
				teks = '*List Vn:*\n\n'
				for (let awokwkwk of audionye) {
					teks += `- ${awokwkwk}\n`
				}
				teks += `\n*Total : ${audionye.length}*`
				lindow.sendMessage(from, teks.trim(), extendedText, { quoted: lin, contextInfo: { "mentionedJid": audionye } })
				break
                case 'getvn':
				namastc = body.slice(7)
				buffer = fs.readFileSync(`./src/audio/${namastc}.mp3`)
				lindow.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', quoted: lin, ptt: true })
				break
                case 'addvn':
				if (!isQuotedAudio) return reply('Reply vn!')
				svst = body.slice(7)
				if (!svst) return reply('Name audio?')
				boij = JSON.parse(JSON.stringify(lin).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await lindow.downloadMediaMessage(boij)
				audionye.push(`${svst}`)
				fs.writeFileSync(`./src/audio/${svst}.mp3`, delb)
				lindow.sendMessage(from, `Succes add vn\n${prefix}listvn to view listvn`, MessageType.text, { quoted: lin })
				break
                case 'stickerlist':
			    case 'liststicker':
				teks = '*Sticker List :*\n\n'
				for (let awokwkwk of setiker) {
					teks += `- ${awokwkwk}\n`
				}
				teks += `\n*Total : ${setiker.length}*`
				lindow.sendMessage(from, teks.trim(), extendedText, { quoted: lin, contextInfo: { "mentionedJid": setiker } })
				break
                case 'getsticker':
			    case 'gets':
				var itsme = `0@s.whatsapp.net`
				var split = `_*STICKER-DATABASE*_`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				namastc = body.slice(12)
				result = fs.readFileSync(`./src/sticker/${namastc}.webp`)
				lindow.sendMessage(from, result, sticker, selepbot)
				break
                case 'stikertag2':
                    var group = await lindow.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
		        namastc = body.slice(12)
				result = fs.readFileSync(`./src/sticker/${namastc}.webp`)
				lindow.sendMessage(from, result, sticker, {contextInfo: { mentionedJid: mem },
					quoted: lin})
				break
                case 'addsticker':
				if (!isQuotedSticker) return reply('Reply sticker')
				svst = body.slice(11)
				if (!svst) return reply('Sticker name?')
				boij = JSON.parse(JSON.stringify(lin).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await lindow.downloadMediaMessage(boij)
				fs.writeFileSync(`./src/sticker/${svst}.webp`, delb)
				setiker.push(`${svst}`)
                fs.writeFileSync('./src/sticker/stik.json', JSON.stringify(setiker))
				lindow.sendMessage(from, `Succes add sticker\n${prefix}liststicker to view stickerlist`, MessageType.text, { quoted: lin})
				break
                case 'happymod':
			data = await fetchJson(`https://tobz-api.herokuapp.com/api/happymod?q=${body.slice(10)}&apikey=BotWeA`, {method: 'get'})
			hupo = data.result[0] 
			teks = `*Nama*: ${data.result[0].title}\n*version*: ${hupo.version}\n*size:* ${hupo.size}\n*root*: ${hupo.root}\n*purchase*: ${hupo.price}\n*link*: ${hupo.link}\n*download*: ${hupo.download}`
			buffer = await getBuffer(hupo.image)
			lindow.sendMessage(from, buffer, image, {quoted: lin, caption: `${teks}`})
			break
               case 'ttp':
							pngttp = './temp/ttp.png'
						    webpng = './temp/ttp.webp'
							const ttptext = body.slice(5)
							fetch(`https://api.areltiyan.site/sticker_maker?text=${ttptext}`, { method: 'GET'})
							.then(async res => {
							const ttptxt = await res.json()
							console.log("finish")
							base64Img.img(ttptxt.base64, 'temp', 'ttp', function(err, filepath) {
							if (err) return console.log(err);
							exec(`ffmpeg -i ${pngttp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${webpng}`, (err) => {
							buffer = fs.readFileSync(webpng)
							lindow.sendMessage(from, buffer, sticker)
							fs.unlinkSync(webpng)
							fs.unlinkSync(pngttp)
							})
							})
							});
							break
                case 'fakedeface':
                    var fakeh = body.slice(12)
                    run = getRandom('.jpeg')
                    encmedia = isQuotedImage ? JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo : lin
                    media = await lindow.downloadAndSaveMediaMessage(encmedia)
                    ddatae = await imageToBase64(JSON.stringify(media).replace(/\"/gi, ''))
                    fs.writeFileSync(`${run}`, ddatae, 'base64')
                    lindow.sendMessage(from, `${fakeh}`, text, {thumbnail: fs.readFileSync(`./${run}`)})
                     break
                case 'cuaca':
                    var kota = body.slice(7)
                    data = await fetchJson(`http://api.lolhuman.xyz/api/cuaca/${kota}?apikey=${Lolkey}`, {method: 'get'})
                     reply(`*Weather*\n\nCity : ${data.result.tempat}\nLatitude : ${data.result.latitude}\nLongitude : ${data.result.longitude}\nWeather : ${data.result.cuaca}\nDescription : ${data.result.description}\n Wind : ${data.result.angin}\nMoisture : ${data.result.kelembapan}\nTemperature : ${data.result.suhu}\nAir : ${data.result.udara}\nSea level : ${data.result.permukaan_laut}`)
                     break
                case 'qrcode':
                    ajgn = body.slice(8)
                    hasil = await getBuffer(`http://api.lolhuman.xyz/api/qrcode?apikey=${Lolkey}&text=${ajgn}`, {method: 'get'})
                    lindow.sendMessage(from, hasil, image, {quoted: lin})
                    break
                case 'qrreader':
                    enmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lindow.downloadAndSaveMediaMessage(enmedia)
					anu = await imgbb("1cf4d50db9a95c32b4f1b1c199183373", media)
					teks = `${anu.display_url}`
                    anu = await fetchJson(`http://api.lolhuman.xyz/api/read-qr?apikey=${Lolkey}&img=${teks}`)
                    reply(anu.result)
                    break
                case 'nhentai':
                    henid = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/nhentai/${henid}?apikey=${Lolkey}`)
                    get_result = get_result.result
                    txt = `Title Romaji : ${get_result.title_romaji}\n`
                    txt += `Title Native : ${get_result.title_native}\n\n`
                    txt += `Read Online : ${get_result.read}\n\n`
                    get_info = get_result.info
                    txt += `Parodies : ${get_info.parodies}\n\n`
                    txt += `Character : ${get_info.characters.join(", ")}\n\n`
                    txt += `Tags : ${get_info.tags.join(", ")}\n\n`
                    txt += `Artist : ${get_info.artists}\n\n`
                    txt += `Group : ${get_info.groups}\n`
                    txt += `Categories : ${get_info.categories}\n`
                    txt += `Pages : ${get_info.pages}\n`
                    txt += `Uploaded : ${get_info.uploaded}\n`
                    reply(txt)
                    break
            case 'fakeimg':
            reply('premium, contact me via WhatsApp')
            break
            case 'attp':
					if (args.length < 1) return reply('Text?')
					ini = body.slice(6)
					atetepe = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURIComponent(ini)}`)
					lindow.sendMessage(from, atetepe, sticker, {quoted: lin})
					break
            case 'emoji':
                ngontol = body.slice(7)
				anu = await getBuffer(`https://docs-jojo.herokuapp.com/api/emoji2png?emoji=${encodeURIComponent(ngontol)}&type=apple`, {method: 'get'})
				lindow.sendMessage(from, anu, image, {quoted : lin})
				break
                case 'nhentaipdf':
                    henid = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/nhentaipdf/${henid}?apikey=${Lolkey}`)
                    get_result = get_result.result
                    buffer = await getBuffer(get_result)
                    lindow.sendMessage(from, buffer, document, { quoted: lin, mimetype: Mimetype.pdf, filename: `${henid}.pdf` })
                    break
			    case 'runtime2':
                runtime6 = process.uptime()
                run6 = `*-[ BOT ACTIVE ]-*\n${kyun(runtime6)}`
                lindow.sendMessage(from, run6, text, {
                quoted: {
                key: {
                fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? {
                remoteJid: "66653612127-1601308925@g.us"
                }: {})
                }, message: {
                "locationMessage":{"degreesLatitude":-6.3238255,"degreesLongitude":107.0412699,"jpegThumbnail":fs.readFileSync(`./image/kanna.jpeg`)}
                      }
                    }
                      })
                    break
                case 'becrypt':
				becry = `${body.slice(9)}`
				anu = await fetchJson(`https://api.i-tech.id/hash/bcrypt?key=TrzDwA-gT8ZNu-xJWUZT-TAUYD5-W6HIOV&string=${becry}`, {method: 'get'})
				lindow.sendMessage(from, `${anu.result}`, text, {quoted: lin})
				break 
			    case 'trigger':
                     if ((isMedia && !lin.message.videoMessage || isQuotedImage) && args.length == 0) {
                         ger = isQuotedImage ? JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo : lin
                         reply(mess.wait)
                        owgi = await lindow.downloadAndSaveMediaMessage(ger)
                        anu = await imgbb("1cf4d50db9a95c32b4f1b1c199183373", owgi)
                        teks = `${anu.display_url}`
                        ranp = getRandom('.gif')
                        rano = getRandom('.webp')
                        anu1 = `https://some-random-api.ml/canvas/triggered?avatar=${teks}`
                         exec(`wget ${anu1} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
                                fs.unlinkSync(ranp)
                                if (err) return reply(mess.error.stick)
                                nobg = fs.readFileSync(rano)
                                 lindow.sendMessage(from, nobg, sticker, {quoted: lin})
                                fs.unlinkSync(rano)
                        })
                    
                             } else {
                                 reply('use picture!')
                          }
                          break  
                case 'katailham':
				quotes = body.slice(1)
				const kta =['Lebih baik mengerti sedikit daripada salah mengerti.','Hampir semua pria memang mampu bertahan menghadapi kesulitan. Namun, jika Anda ingin menguji karakter sejati pria, beri dia kekuasaan.','Bila tekad seseorang kuat dan teguh, Tuhan akan bergabung dalam usahanya.','Penderitaan adalah pelajaran.','Ilmu pengetahuan tanpa agama adalah pincang.','Hidup itu seperti sebuah sepeda, agar tetap seimbang kita harus tetap bergerak.','Perbedaan masa lalu, sekarang, dan masa depan tak lebih dari ilusi yang keras kepala.','Sebuah meja, sebuah kursi, semangkuk buah, dan sebuah biola; apa lagi yang dibutuhkan agar seseorang bisa merasa bahagia?','Belas kasihanlah terhadap sesama, bersikap keraslah terhadap diri sendiri.','Cara paling baik untuk menggerakkan diri Anda ialah memberi tugas kepada diri sendiri.','Kita tidak boleh kehilangan semangat. Semangat adalah stimulan terkuat untuk mencintai, berkreasi dan berkeinginan untuk hidup lebih lama.','Manusia akan bahagia selama ia memilih untuk bahagia.','Saya tidak berharap menjadi segalanya bagi setiap orang. Saya hanya ingin menjadi sesuatu untuk seseorang.','Apabila sempurna akal seseorang, maka sedikit perkataannya.','Bahagialah orang yang dapat menjadi tuan untuk dirinya, menjadi kusir untuk nafsunya dan menjadi kapten untuk bahtera hidupnya.','Sahabat yang jujur lebih besar harganya daripada harta benda yang diwarisi dari nenek moyang.','Yang paling melelahkan dalam hidup adalah menjadi orang yang tidak tulus.','Terbuka untuk Anda, begitulah Tuhan memberi kita jalan untuk berusaha. Jangan pernah berfikir jalan sudah tertutup.','Penundaan adalah kuburan dimana peluang dikuburkan.','Cinta bukan saling menatap mata, namun melihat ke arah yang sama bersama-sama.','Kita adalah apa yang kita kerjakan berulang kali. Dengan demikian, kecemerlangan bukan tindakan, tetapi kebiasaan.','Jangan pernah mencoba menjadikan putra atau putri Anda menjadi seperti Anda. Diri Anda hanya cukup satu saja.','Jika Anda bisa membuat orang lain tertawa, maka Anda akan mendapatkan semua cinta yang Anda inginkan.','Masalah akan datang cepat atau lambat. Jika masalah datang, sambut dengan sebaik mungkin. Semakin ramah Anda menyapanya, semakin cepat ia pergi.','Kita tak bisa melakukan apapun untuk mengubah masa lalu. Tapi apapun yang kita lakukan bisa mengubah masa depan.','Kesabaran adalah teman dari kebijaksanaan.','Orang-orang kreatif termotivasi oleh keinginan untuk maju, bukan oleh keinginan untuk mengalahkan orang lain.','Dimanapun engkau berada selalulah menjadi yang terbaik dan berikan yang terbaik dari yang bisa kita berikan.','Kebencian seperti halnya cinta, berkobar karena hal-hal kecil.','Anda tidak perlu harus berhasil pada kali pertama.','Satu jam yang intensif, jauh lebih baik dan menguntungkan daripada bertahun-tahun bermimpi dan merenung-renung.','Hal terbaik yang bisa Anda lakukan untuk orang lain bukanlah membagikan kekayaan Anda, tetapi membantu dia untuk memiliki kekayaannya sendiri.','Tidak ada jaminan keberhasilan, tetapi tidak berusaha adalah jaminan kegagalan.','Aku tidak tahu kunci sukses itu apa, tapi kunci menuju kegagalan adalah mencoba membuat semua orang senang.']
				const su = kta[Math.floor(Math.random() * kta.length)]
				lindow.sendMessage(from, ''+su+'\n\n-Ilham.', text, { quoted: lin})
				break
               case 'citacita':
               const cita =['http://piyobot.000webhostapp.com/citacita1.mp3','http://piyobot.000webhostapp.com/citacita2.mp3','http://piyobot.000webhostapp.com/citacita3.mp3','http://piyobot.000webhostapp.com/citacita4.mp3','http://piyobot.000webhostapp.com/citacita5.mp3','http://piyobot.000webhostapp.com/citacita6.mp3','http://piyobot.000webhostapp.com/citacita7.mp3','http://piyobot.000webhostapp.com/citacita8.mp3','http://piyobot.000webhostapp.com/citacita9.mp3','http://piyobot.000webhostapp.com/citacita10.mp3','http://piyobot.000webhostapp.com/citacita11.mp3','http://piyobot.000webhostapp.com/citacita12.mp3','http://piyobot.000webhostapp.com/citacita13.mp3','http://piyobot.000webhostapp.com/citacita14.mp3','http://piyobot.000webhostapp.com/citacita15.mp3','http://piyobot.000webhostapp.com/citacita16.mp3','http://piyobot.000webhostapp.com/citacita17.mp3','http://piyobot.000webhostapp.com/citacita18.mp3','http://piyobot.000webhostapp.com/citacita19.mp3','http://piyobot.000webhostapp.com/citacita20.mp3','http://piyobot.000webhostapp.com/citacita21.mp3','http://piyobot.000webhostapp.com/citacita22.mp3','http://piyobot.000webhostapp.com/citacita23.mp3','http://piyobot.000webhostapp.com/citacita24.mp3','http://piyobot.000webhostapp.com/citacita25.mp3','http://piyobot.000webhostapp.com/citacita26.mp3','http://piyobot.000webhostapp.com/citacita27.mp3','http://piyobot.000webhostapp.com/citacita28.mp3','http://piyobot.000webhostapp.com/citacita29.mp3','http://piyobot.000webhostapp.com/citacita30.mp3','http://piyobot.000webhostapp.com/citacita31.mp3','http://piyobot.000webhostapp.com/citacita32.mp3','http://piyobot.000webhostapp.com/citacita33.mp3','http://piyobot.000webhostapp.com/citacita34.mp3','http://piyobot.000webhostapp.com/citacita35.mp3']
               const cita3 = cita[Math.floor(Math.random() * cita.length)]
               cita2 = await getBuffer(cita3)
               lindow.sendMessage(from, cita2, audio,{mimetype: 'audio/mp4', ptt:true, quoted: lin})
               break
                case 'asupan':
                anu = await fetchJson(`http://lolhuman.herokuapp.com/api/asupan?apikey=lindowganteng123`, {method: 'get'})
                buff = await getBuffer(anu.result)
                lindow.sendMessage(from, buff, video, {caption: `Succes`})
                    break
                case 'gtav':
                    enmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lindow.downloadAndSaveMediaMessage(enmedia)
					anu = await imgbb("1cf4d50db9a95c32b4f1b1c199183373", media)
					teks = `${anu.display_url}`
					foto = await getBuffer(`https://videfikri.com/api/textmaker/gtavposter/?urlgbr=${teks}`, {method: 'get'})
					lindow.sendMessage(from, foto, image, {quoted: lin})
					break
                case 'wasted':
                    enmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lindow.downloadAndSaveMediaMessage(enmedia)
					anu = await imgbb("1cf4d50db9a95c32b4f1b1c199183373", media)
					teks = `${anu.display_url}`
					foto = await getBuffer(`http://api.lolhuman.xyz/api/editor/wasted?apikey=${Lolkey}&img=${teks}`, {method: 'get'})
					lindow.sendMessage(from, foto, image, {quoted: lin})
					break
                case 'distortion':
                    enmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lindow.downloadAndSaveMediaMessage(enmedia)
					anu = await imgbb("1cf4d50db9a95c32b4f1b1c199183373", media)
					teks = `${anu.display_url}`
					foto = await fetchJson(`https://naufalhoster.xyz/tools/distortion?apikey=${Nopalkey}&url=${teks}`, {method: 'get'})
					bb = await getBuffer(foto.result.image)
					lindow.sendMessage(from, bb, image, {quoted: lin})
					break
                case 'comic':
                    enmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lindow.downloadAndSaveMediaMessage(enmedia)
					anu = await imgbb("1cf4d50db9a95c32b4f1b1c199183373", media)
					teks = `${anu.display_url}`
					foto = await fetchJson(`https://naufalhoster.xyz/tools/photo_comic?apikey=${Nopalkey}&url=${teks}`, {method: 'get'})
					bb = await getBuffer(foto.result.image)
					lindow.sendMessage(from, bb, image, {quoted: lin})
					break
               case 'nightvision':
                    enmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lindow.downloadAndSaveMediaMessage(enmedia)
					anu = await imgbb("1cf4d50db9a95c32b4f1b1c199183373", media)
					teks = `${anu.display_url}`
					foto = await fetchJson(`https://naufalhoster.xyz/tools/night_vision?apikey=${Nopalkey}&url=${teks}`, {method: 'get'})
					bb = await getBuffer(foto.result.image)
					lindow.sendMessage(from, bb, image, {quoted: lin})
					break
                case 'graviti':
                    enmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lindow.downloadAndSaveMediaMessage(enmedia)
					anu = await imgbb("1cf4d50db9a95c32b4f1b1c199183373", media)
					teks = `${anu.display_url}`
					foto = await fetchJson(`https://naufalhoster.xyz/tools/photo_grafitti?apikey=${Nopalkey}&url=${teks}`, {method: 'get'})
					bb = await getBuffer(foto.result.image)
					lindow.sendMessage(from, bb, image, {quoted: lin})
					break
                case 'fire':
                    enmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lindow.downloadAndSaveMediaMessage(enmedia)
					anu = await imgbb("1cf4d50db9a95c32b4f1b1c199183373", media)
					teks = `${anu.display_url}`
					foto = await fetchJson(`https://naufalhoster.xyz/tools/photo_fire?apikey=${Nopalkey}&url=${teks}`, {method: 'get'})
					bb = await getBuffer(foto.result.image)
					lindow.sendMessage(from, bb, image, {quoted: lin})
					break
                case 'cartoon':
                    enmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lindow.downloadAndSaveMediaMessage(enmedia)
					anu = await imgbb("1cf4d50db9a95c32b4f1b1c199183373", media)
					teks = `${anu.display_url}`
					foto = await fetchJson(`https://naufalhoster.xyz/tools/photo_cartoon?apikey=${Nopalkey}&url=${teks}`, {method: 'get'})
					bb = await getBuffer(foto.result.image)
					lindow.sendMessage(from, bb, image, {quoted: lin})
					break
                case 'negative':
                    enmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lindow.downloadAndSaveMediaMessage(enmedia)
					anu = await imgbb("1cf4d50db9a95c32b4f1b1c199183373", media)
					teks = `${anu.display_url}`
					foto = await fetchJson(`https://naufalhoster.xyz/tools/negative?apikey=${Nopalkey}&url=${teks}`, {method: 'get'})
					bb = await getBuffer(foto.result.image)
					lindow.sendMessage(from, bb, image, {quoted: lin})
					break
                case 'zoomeffect':
                    enmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lindow.downloadAndSaveMediaMessage(enmedia)
					anu = await imgbb("1cf4d50db9a95c32b4f1b1c199183373", media)
					teks = `${anu.display_url}`
					foto = await fetchJson(`https://naufalhoster.xyz/tools/blurry_zoom?apikey=${Nopalkey}&url=${teks}`, {method: 'get'})
					bb = await getBuffer(foto.result.image)
					lindow.sendMessage(from, bb, image, {quoted: lin})
					break
                case 'fisheye':
                    enmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lindow.downloadAndSaveMediaMessage(enmedia)
					anu = await imgbb("1cf4d50db9a95c32b4f1b1c199183373", media)
					teks = `${anu.display_url}`
					foto = await getBuffer(`http://api.lolhuman.xyz/api/editor/fisheye?apikey=${Lolkey}&img=${teks}`, {method: 'get'})
					lindow.sendMessage(from, foto, image, {quoted: lin})
					break
                case 'phcostum':
                    if (args.length == 1) return reply(`usage : ${prefix}phcostum lindow|wah pinky`)
                    enmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lindow.downloadAndSaveMediaMessage(enmedia)
					anu = await imgbb("1cf4d50db9a95c32b4f1b1c199183373", media)
					var kls = body.slice(10)
					var nama = kls.split("|")[0];
					var komen = kls.split("|")[1];
					teks = `${anu.display_url}`
					foto = await getBuffer(`https://naufalhoster.xyz/textmaker/phcomment_custom?apikey=${Nopalkey}&nama=${nama}&comment=${komen}&url=${teks}`, {method: 'get'})
					lindow.sendMessage(from, foto, image, {quoted: lin})
					break
                case 'facematching':
                    enmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lindow.downloadAndSaveMediaMessage(enmedia)
					anu = await imgbb("1cf4d50db9a95c32b4f1b1c199183373", media)
					teks = `${anu.display_url}`
					foto = await fetchJson(`https://naufalhoster.xyz/tools/face_matching?apikey=${Nopalkey}&url=${teks}`)
					var textg = `Name : ${foto.result.name}\n\nScore : ${foto.result.score}\n\nSource : ${foto.result.wikipedia}`
					var buff = await getBuffer(foto.result.faceImage)
					lindow.sendMessage(from, buff, image, {quoted: lin, caption: textg})
					break
                case 'spamcall':
                    anu = await fetchJson(`https://tobz-api.herokuapp.com/api/spamcall?no=${body.slice(12)}&apikey=BotWeA`, {method: 'get'})
                    reply(`${anu.logs}`)
                    break
                case 'pencil':
                    enmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lindow.downloadAndSaveMediaMessage(enmedia)
					anu = await imgbb("1cf4d50db9a95c32b4f1b1c199183373", media)
					teks = `${anu.display_url}`
					foto = await getBuffer(`http://api.lolhuman.xyz/api/editor/pencil?apikey=${Lolkey}&img=${teks}`, {method: 'get'})
					lindow.sendMessage(from, foto, image, {quoted: lin})
					break
                case 'wanted':
                    enmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lindow.downloadAndSaveMediaMessage(enmedia)
					anu = await imgbb("1cf4d50db9a95c32b4f1b1c199183373", media)
					teks = `${anu.display_url}`
					var kls = body.slice(8)
			        var has = kls.split("|")[0];
			        var kas = kls.split("|")[1];
					foto = await getBuffer(`https://videfikri.com/api/textmaker/wanted/?urlgbr=${teks}&text1=${has}&text2=${kas}`, {method: 'get'})
					lindow.sendMessage(from, foto, image, {quoted: lin})
					break
                case 'wineffect':
                    enmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo

					media = await lindow.downloadAndSaveMediaMessage(enmedia)
					anu = await imgbb("1cf4d50db9a95c32b4f1b1c199183373", media)
					teks = `${anu.display_url}`
					foto = await getBuffer(`https://naufalhoster.xyz/textmaker/windows_delete_file?apikey=${Nopalkey}&url=${teks}`)
					lindow.sendMessage(from, foto, image, {quoted: lin})
					break
                case 'upstorypic':
                        reply('premium, contact me via WhatsApp')
                        break
                 case 'listbadword':
                    let lbw = `List badword\nTotal : ${bad.length}\n`
                    for (let i of bad) {
                        lbw += `➸ ${i.replace(bad)}\n`
                    }
                    await reply(lbw)
                    break
                case 'upstoryvid':
                        reply('premium, contact me via WhatsApp')
                        break
                case 'nobadword':
                    if (!isGroup) return reply('for group only')
                if (args.length < 1) return reply('enable or disable?')
                if (args[0] === 'enable') {
                if (isBadWord) return reply('*badword is enable*')
                 	   badword.push(from)
                 	   fs.writeFileSync('./src/group/badword.json', JSON.stringify(badword))
                  	   reply(`badword is enable`)
              	  } else if (args[0] === 'disable') {
                  	  badword.splice(from, 1)
                 	   fs.writeFileSync('./src/group/badword.json', JSON.stringify(badword))
                 	    reply(`badword is disable`)
             	   } else {
                 	   reply('err')
                	}
                    break
                case 'delbadword':
                    if (args.length < 1) return reply(`usage ${prefix}delbadword [badword]. example ${prefix}delbadword bitch`)
                    let dbw = body.slice(12)
                    bad.splice(dbw)
                    fs.writeFileSync('./src/group/bad.json', JSON.stringify(bad))
                    reply('Success delete bad word!')
                    break 
                case 'upstory':
                    teks = body.slice(9)
                    lindow.sendMessage('status@broadcast', teks, MessageType.text)
                    croo = '*Succes sendtext to story*'
                    costum('Done..', text, tescuk, croo)
                    break
                case 'addbadword':
                    if (args.length < 1) return reply( `usage ${prefix}addbadword [badword]. example ${prefix}addbadword bitch`)
                    const bw = body.slice(12)
                    bad.push(bw)
                    fs.writeFileSync('./src/group/bad.json', JSON.stringify(bad))
                    reply('Success add Bad Word!')
                    break
                case 'textmenu':
                    await costum(textmenu(prefix), text, tescuk, cr)
                    break
				case 'info':
					me = lindow.user
					uptime = process.uptime()
					teks = `*Name :* ${me.name}\n\n*Number :* @${me.jid.split('@')[0]}\n\n*My prefix :* ${prefix}\n\n*Total block contact :* ${blocked.length}\n\n*Runtime :* ${kyun(uptime)}`
					buffer = await getBuffer(me.imgUrl)
					lindow.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
                case 'mark':
                teks = body.slice(6)
                markentod = '*_MARKENTOD_*' // Jangan dipake, nanti di ban nangid awokwokwok
                lindow.sendMessage("0@s.whatsapp.net", `${teks}`, MessageType.text)
                await costum('Succses send pesan ke markenlin', text, tescuk, markentod)
                break
                case 'setdesc':
                lindow.groupUpdateDescription(from, `${body.slice(9)}`)
                lindow.sendMessage(from, 'Succes, change description group', text, {quoted: lin})
					break
               case 'royal':
               anu = await getBuffer(`http://api.lolhuman.xyz/api/ephoto1/royaltext?apikey=${Lolkey}&text=${body.slice(7)}`, {method: 'get'})
               lindow.sendMessage(from, anu, image, {quoted: lin})
               break
               case 'kusonimesearch':
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/kusonimesearch?apikey=${Lolkey}&query=${query}`)
                    get_result = get_result.result
                    txt = `Title : ${get_result.title}\n`
                    txt += `Japanese : ${get_result.japanese}\n`
                    txt += `Genre : ${get_result.genre}\n`
                    txt += `Seasons : ${get_result.seasons}\n`
                    txt += `Producers : ${get_result.producers}\n`
                    txt += `Type : ${get_result.type}\n`
                    txt += `Status : ${get_result.status}\n`
                    txt += `Total Episode : ${get_result.total_episode}\n`
                    txt += `Score : ${get_result.score}\n`
                    txt += `Duration : ${get_result.duration}\n`
                    txt += `Released On : ${get_result.released_on}\n`
                    txt += `Desc : ${get_result.desc}\n`
                    link_dl = get_result.link_dl
                    for (var x in link_dl) {
                        txt += `\n${x}\n`
                        for (var y in link_dl[x]) {
                            txt += `${y} - ${link_dl[x][y]}\n`
                        }
                    }
                    buffer = await getBuffer(get_result.thumbnail)
                    lindow.sendMessage(from, buffer, image, { quoted: lin, caption: txt })
                    break
               case 'kusonime':
                    ini_url = body.slice(10)
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/kusonime?apikey=${Lolkey}&url=${ini_url}`)
                    get_result = get_result.result
                    txt = `Title : ${get_result.title}\n`
                    txt += `Japanese : ${get_result.japanese}\n`
                    txt += `Genre : ${get_result.genre}\n`
                    txt += `Seasons : ${get_result.seasons}\n`
                    txt += `Producers : ${get_result.producers}\n`
                    txt += `Type : ${get_result.type}\n`
                    txt += `Status : ${get_result.status}\n`
                    txt += `Total Episode : ${get_result.total_episode}\n`
                    txt += `Score : ${get_result.score}\n`
                    txt += `Duration : ${get_result.duration}\n`
                    txt += `Released On : ${get_result.released_on}\n`
                    txt += `Desc : ${get_result.desc}\n`
                    link_dl = get_result.link_dl
                    for (var x in link_dl) {
                        txt += `\n${x}\n`
                        for (var y in link_dl[x]) {
                            txt += `${y} - ${link_dl[x][y]}\n`
                        }
                    }
                    buffer = await getBuffer(get_result.thumbnail)
                    lindow.sendMessage(from, buffer, image, { quoted: lin, caption: txt })
                    break
               case 'setnamegc':
                lindow.groupUpdateSubject(from, `${body.slice(11)}`)
                lindow.sendMessage(from, 'Succes, change group name', text, {quoted: lin})
					break
		       case 'runtime':
    				    runtime = process.uptime()
                        cr2 = '*_LINDOW - RUNTIME_*'
						teks = `${monospace(`Runtime:\n◪ ${kyun(runtime)}`)}`
						await costum(teks, text, tescuk, cr2)
    						break
		       case 'bass':
					encmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lindow.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -af equalizer=f=64:width_type=o:width=2:g=56 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						lindow.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: lin})
						fs.unlinkSync(ran)
					})
				break
            case 'tahta':
            case 'harta':
                tahta = `${body.slice(7)}`
                     if (args.length < 1) return reply('Text?')
                     if (args.length > 10) return reply('Text maximal 10')
                     reply(mess.wait)
                     buff = await getBuffer(`https://naufalhoster.xyz/textmaker/harta_tahta?apikey=${Nopalkey}&text=${tahta}`, {method: 'get'})
                     lindow.sendMessage(from, buff, image, {quoted: lin, caption: `Harta Tahta ${tahta}`})
                  break  
            case 'return':
				return lindow.sendMessage(from, JSON.stringify(eval(args.join(' '))), text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "productMessage":{"product":{"productImage":{"mimetype":"image/jpeg","height":736,"width":736,"jpegThumbnail":fs.readFileSync(`./image/ngontol.png`)},"productId":"3937202479680283","title":"𝐋𝐈𝐍𝐃𝐎𝐖 𝐒𝐄𝐋𝐅𝐁𝐎𝐓","currencyCode":"RUB","priceAmount1000":"9999999999000","productImageCount":1},"businessOwnerJid":"0@s.whatsapp.net"}}}, contextInfo: { forwardingScore: 508, isForwarded: true }})
				break
            case 'shutdown':
                reply('okey')
                await sleep(5000)
				return lindow.sendMessage(from, JSON.stringify(eval(process.exit())), text, {quoted: lin})
				break
            case 'readmore':
					if (args.length < 1) return reply(`*Usage :*\n${prefix}readmore Teks|Teksreadmore\n\n*Ex :*\n${prefix}readmore Cinta|i ususmu, minum blabla`)
					var kls = body.slice(10)
					var has = kls.split("|")[0];
					var kas = kls.split("|")[1];
					if (args.length < 1) return reply(mess.blank)
					lindow.sendMessage(from, `${has}‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎${kas}` , text, { quoted: lin })
					break
            case 'afk': // Mastah, bagi case afk yg asli dong
                    tels = body.slice(5)
                     if (args.length < 1) return reply('text?')
                    var nom = lin.participant
                    const tag = {
                    text: `*Now afk*\n\nReason : ${tels}`,
                    contextInfo: { mentionedJid: [nom] }
                                        }
                    lindow.sendMessage(from, tag, text, {quoted: lin})
                    break
            case 'pornhubsearch':
                arg = args.join(" ")
                anu = await fetchJson(`http://api.lolhuman.xyz/api/pornhubsearch?apikey=${Lolkey}&query=${arg}`, {method: 'get'})
                teks = '*PORNHUB SEARCH*'
                var hhhh = '1'
                for (let i = 0; i < anu.result.length; i++) {
                    teks += `\n\n*Urutan ${hhhh}*\nTitle : ${anu.result[i].title}\nViews : ${anu.result[i].views}\nDuration : ${anu.result[i].duration}\nUploader : ${anu.result[i].uploader}\nRating : ${anu.result[i].rating}\nAdded : ${anu.result[i].added}\nLink : ${anu.result[i].link}`
                    hhhh++
                }
                f = await getBuffer(anu.result[0].thumbnail)
                lindow.sendMessage(from, f, image, {quoted:{ key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { conversation: '*PORNHUB-SEARCH*'}}, contextInfo: { forwardingScore: 508, isForwarded: true }, caption: teks})
                break
            case 'xnxxsearch':
                anu = await fetchJson(`http://api.lolhuman.xyz/api/xnxxsearch?apikey=${Lolkey}&query=${body.slice(12)}`, {method: 'get'})
                teks = '*Xnxx search*'
                var hhhh = '1'
                for (let i = 0; i < anu.result.length; i++) {
                    teks += `\n\n*Urutan ${hhhh}*\nTitle : ${anu.result[i].title}\nViews : ${anu.result[i].views}\nDuration : ${anu.result[i].duration}\nUploader : ${anu.result[i].uploader}\nLink : ${anu.result[i].link}`
                    hhhh++
                }
                f = await getBuffer(anu.result[0].thumbnail)
                lindow.sendMessage(from, f, image, {quoted:{ key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { conversation: '*XNXX-SEARCH*'}}, contextInfo: { forwardingScore: 508, isForwarded: true }, caption: teks})
                break
            case 'berita':
                anu = await fetchJson(`http://api.lolhuman.xyz/api/newsinfo?apikey=${Lolkey}`, {method: 'get'})
                teks = 'News info'
                var hhhh = '1'
                for (let i = 0; i < anu.result.length; i++) {
                    teks += `\n\n*Berita ${hhhh}*\nTitle : ${anu.result[i].title}\nSource : ${anu.result[i].source.name}\nTime : ${anu.result[i].publishedAt}\n\nDescription : ${anu.result[i].description}\n\nUrl : ${anu.result[i].url}`
                    hhhh++
                }
                reply(teks)
                break
            case 'ytstalk':
                anu = await fetchJson(`http://api.lolhuman.xyz/api/ytchannel?apikey=lindowganteng123&query=${body.slice(9)}`, {method: 'get'})
                teks = `*YOUTUBE - STALK*`
                var nomore = '1'
                for (let i = 0; i < anu.result.length; i++) {
                    teks += `\n\n*Urutan ${nomore}*\n*Channel name :* ${anu.result[i].channel_name}\n*Channel id :* ${anu.result[i].channel_id}\n*Channel created :* ${anu.result[i].channel_created}`
                    nomore++
                }
                buff = await getBuffer(anu.result[0].channel_picture.high.url)
               lindow.sendMessage(from, buff, image, {quoted: lin, caption: teks})
                break
            case 'ytsearch':
            yts = '_*SEARCHING - MEDIA*_'
                quer = body.slice(10)
                await costum(`Searching data..`, text, tescuk, yts)
                anu = await fetchJson(`http://api.lolhuman.xyz/api/ytsearch?apikey=${Lolkey}&query=${quer}`, {method: 'get'})
                teks = `*YOUTUBE - SEARCH*\n\n To take audio To take audio ${prefix}getaudio <id>\nTo take video ${prefix}getvideo <id>`
                var nomore = '1'
                for (let i = 0; i < anu.result.length; i++) {                                         teks += `\n\n*Number ${nomore}*\n*Title :* ${anu.result[i].title}\n*Id :* ${anu.result[i].videoId}\n*Publish :* ${anu.result[i].published}\n*Views :* ${anu.result[i].views}`
                    nomore++
                }
                buff = await getBuffer(anu.result[0].thumbnail)
               lindow.sendMessage(from, buff, image, {quoted: lin, caption: teks})
                break
            case 'facebook':
                mengontol = body.slice(10)
                data = await fetchJson(`http://api.lolhuman.xyz/api/facebook?apikey=${Lolkey}&url=${mengontol}`, {method: 'get'})
                pepek = '*FACEBOOK DOWNLOADER*'
                var belajarmenghitung = '1'
                for (let i = 0; i < data.result.length; i++) {
                    pepek += `\n\n*Urutan ${belajarmenghitung}*\nTitle : ${data.title}\nType : ${data.result[i].type}\nResolution : ${data.result[i].resolution}\nLink download : \n${data.result[i].link}`
                }
                reply(pepek)
                break
            case 'drakor':
                quer = body.slice(8)
                anu = await fetchJson(`https://naufalhoster.xyz/dl/drakor?apikey=${Nopalkey}&query=${quer}`, {method: 'get'})
                for (let a = 0; a < anu.result.length; a++){
                short1 = await fetchJson(`https://naufalhoster.xyz/tools/tinyurl?apikey=${Nopalkey}&url=${anu.result[a].server1}`, {method: 'get'})
                short2 = await fetchJson(`https://naufalhoster.xyz/tools/tinyurl?apikey=${Nopalkey}&url=${anu.result[a].server2}`, {method: 'get'})
                short3 = await fetchJson(`https://naufalhoster.xyz/tools/tinyurl?apikey=${Nopalkey}&url=${anu.result[a].server3}`, {method: 'get'})
                }
                teks = '*DRAKOR - SCRAPER*'
                var urut = '1'
                for (let i = 0; i < anu.result.length; i++) {
                    teks += `\n\n*Number ${urut}*\n*Title: ${anu.result[i].judul}*\n\nLink download :\nServer 1:\n${short1.result.shortUrl}\n\nServer 2:\n${short2.result.shortUrl}\n\nServer 3\n${short3.result.shortUrl}`
                    urut++
                }
                reply(teks)
                break
            case 'jooxf':
                if (args.length < 1) return reply('query?')
                quer = body.slice(7)
                anu = await fetchJson(`http://api.hurtzcrafter.xyz/joox?q=${quer}`, {method: 'get'})
                var teks = '*Joox Search*'
                var nomore = '1'
                for (let i = 0; i < anu.data.length; i++) {
                    teks += `\n\nUrutan ${nomore}\nTitle : ${anu.data[i].lagu}\nAlbum : ${anu.data[i].album}\nSinger : ${anu.data[i].penyanyi}\nPublished : ${anu.data[i].publish}`
                    nomore++
                }
                reply(teks)
                break
            case 'igstory':
                if (args.length < 1) return reply('Masukan query')
                user = body.slice(9)
                anu = await fetchJson(`http://api.lolhuman.xyz/api/igstory/${user}?apikey=${Lolkey}`, {method: 'get'})
                var teks1 = '*INSTAGRAM - STORY*'
                var nomore2 = '1'
                for (let i = 0; i < anu.result.length; i++) {
                    teks1 += `\n\n*Urutan ${nomore2}*\n*Type :* ${anu.result[i].type}\n*Url download :*\n${anu.result[i].url}`
                    nomore2++
                }
                reply(teks1)
                break
            case 'ighl':
                if (args.length < 1) return reply('Masukan query')
                user2 = body.slice(6)
                anu = await fetchJson(`http://api.lolhuman.xyz/api/highlights/${user2}?apikey=${Lolkey}`, {method: 'get'})
                teks1 = '*INSTAGRAM - HIGHLIGHT*'
                for (let i = 0; i < anu.result.length; i++) {
                    teks1 += `\n\nTitle: ${anu.result[i].title}\nAdded: ${anu.result[1].added}\nUrl download:\n${anu.result[i].url}`
                    nomore2++
                }
                reply(teks1)
                break
            case 'quotes':
                qute = await getBuffer(`http://api.lolhuman.xyz/api/random/quotesimage?apikey=${Lolkey}`, {method: 'get'})
                lindow.sendMessage(from, qute, image, {quoted: lin})
                break
            case 'picmeme':
                enmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lindow.downloadAndSaveMediaMessage(enmedia)
					anu = await imgbb("1cf4d50db9a95c32b4f1b1c199183373", media)
					teks1 = `${anu.display_url}`
                var teks = body.slice(9)
                var has = teks.split("|")[0];
                var kas = teks.split("|")[1];
                pic = await getBuffer(`https://naufalhoster.xyz/tools/meme?apikey=lindowganteng123&url=${teks1}&text1=${has}&text2=${kas}`, {method: 'get'})
                lindow.sendMessage(from, pic, image, {quoted: lin})
                break
            case 'phkomen':
                if (args.length < 1) return reply(`*Usage :* ${prefix}phkomen yourname|yourtext\n\n*Ex :* ${prefix}phkomen Sugiono|wah pinky`)
                var teks = body.slice(9)
                var has = teks.split("|")[0];
                var kas = teks.split("|")[1];
                data = await getBuffer(`https://naufalhoster.xyz/textmaker/phcomment?apikey=${Nopalkey}&nama=${has}&comment=${kas}`)
                lindow.sendMessage(from, data, image, {quoted: lin})
                break
            case 'valo':
                if (args.length < 1) return reply(`*Usage :* ${prefix}valo text1|text\n\n*Ex :* ${prefix}valo text|twitter|facebook`)
                var teks = body.slice(6)
                var has = teks.split("|")[0];
                var kas = teks.split("|")[1];
                var kus = teks.split("|")[2];
                data = await getBuffer(`http://api.lolhuman.xyz/api/ephoto3/valorantbanner?apikey=${Lolkey}&text1=${has}&text2=${kas}&text3=${kus}`)
                lindow.sendMessage(from, data, image, {quoted: lin})
                break
            case 'cod':
                if (args.length < 1) return reply(`*Usage :* ${prefix}cod text1|text\n\n*Ex :* ${prefix}cod Sugiono|wah pinky`)
                var teks = body.slice(5)
                var has = teks.split("|")[0];
                var kas = teks.split("|")[1];
                data = await getBuffer(`http://api.lolhuman.xyz/api/ephoto2/codwarzone?apikey=${Lolkey}&text1=${has}&text2=${kas}`)
                lindow.sendMessage(from, data, image, {quoted: lin})
                break
            case 'battlefield':
                if (args.length < 1) return reply(`*Usage :* ${prefix}battlefield text1|text\n\n*Ex :* ${prefix}battlefield Sugiono|wah pinky`)
                var teks = body.slice(13)
                var has = teks.split("|")[0];
                var kas = teks.split("|")[1];
                data = await getBuffer(`https://naufalhoster.xyz/textmaker/battlefield?apikey=${Nopalkey}&text1=${has}&text2=${kas}`)
                lindow.sendMessage(from, data, image, {quoted: lin})
                break
            case 'pubg':
                if (args.length < 1) return reply(`*Usage :* ${prefix}pubg text1|text\n\n*Ex :* ${prefix}pubg Sugiono|wah pinky`)
                var teks = body.slice(6)
                var has = teks.split("|")[0];
                var kas = teks.split("|")[1];
                data = await getBuffer(`http://api.lolhuman.xyz/api/photooxy2/pubg?apikey=${Lolkey}&text1=${has}&text2=${kas}`)
                lindow.sendMessage(from, data, image, {quoted: lin})
                break
            case 'bannerlol':
                if (args.length < 1) return reply(`*Usage :*\n\n${prefix}bannerlol text1`)
                var teks = body.slice(11)
                data = await getBuffer(`http://api.lolhuman.xyz/api/photooxy3/bannerlol?apikey=${Lolkey}&text=${teks}`)
                lindow.sendMessage(from, data, image, {quoted: lin})
                break
            case '8bit':
                if (args.length < 1) return reply(`*Usage :* ${prefix}8bit text1|text\n\n*Ex :* ${prefix}8bit Sugiono|wah pinky`)
                var teks = body.slice(6)
                var has = teks.split("|")[0];
                var kas = teks.split("|")[1];
                data = await getBuffer(`http://api.lolhuman.xyz/api/photooxy2/arcade8bit?apikey=${Lolkey}&text1=${has}&text2=${kas}`)
                lindow.sendMessage(from, data, image, {quoted: lin})
                break
            case 'unreadall':
                    reply('premium, contact me via WhatsApp')
					break
			case 'readall':
					var chats = await lindow.chats.all()
                    chats.map( async ({ jid }) => {
                          await lindow.chatRead(jid)
                    })
					teks = `\`\`\`Successfully read ${chats.length} chats !\`\`\``
					await lindow.sendMessage(from, teks, MessageType.text, {quoted: lin})
					console.log(chats.length)
					break
             case 'virtex':
               lindow.sendMessage(from, virtex(prefix, sender), text, {quoted: lin})
               break
             case 'fakereply':
                if (args.length < 1) return reply(`Usage :\n${prefix}fakereply [@tag|pesan|balasanbot]]\n\nEx : \n${prefix}fakereply @tagmember|hai|hai juga`)
				var gh = body.slice(11)
				    mentioned = lin.message.extendedTextMessage.contextInfo.mentionedJid
					var replace = gh.split("|")[0];
					var target = gh.split("|")[1];
					var bot = gh.split("|")[2];
					lindow.sendMessage(from, `${bot}`, text, {quoted: { key: { fromMe: false, participant: `${mentioned}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target}` }}})
					break
            case 'randomhorror':
                anu = await fetchJson(`https://naufalhoster.xyz/tools/story_horror?apikey=${Nopalkey}`, {method: 'get'})
                reply(`*Horror story*\n\nTitle : ${anu.result.title}\n\n${anu.result.story}`)
                break
            case 'fakereply2':
                if (args.length < 1) return reply(`Usage :\n${prefix}fakereply [nomor|pesan|balasanbot]]\n\nEx : \n${prefix}fakereply 0|hai|hai juga markenlin`)
                var gh = body.slice(12)
                var parti = gh.split("|")[0];
                var target = gh.split("|")[1];
				var bot = gh.split("|")[2];
				lindow.sendMessage(from, `${bot}`, text, {quoted: { key: { fromMe: false, participant: `${parti}@s.whatsapp.net`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target}` }}})
					break
            case 'fakereply3':
                if (args.length < 1) return reply(`Usage :\n${prefix}fakereply [nomor|pesan|balasanbot]]\n\nEx : \n${prefix}fakereply 0|hai|hai juga markenlin`)
                var gh = body.slice(12)
                var parti = gh.split("|")[0];
                var target = gh.split("|")[1];
				var bot = gh.split("|")[2];
				lindow.sendMessage(from, `${bot}`, text, {quoted: { key: { fromMe: false, participant: `${parti}@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { conversation: `${target}` }}})
					break
			case 'translate':
			    var tr = body.slice(11)
			    var kode = tr.split("|")[0];
			    var quer = tr.split("|")[1];
			    anu = await fetchJson(`http://api.lolhuman.xyz/api/translate/auto/${kode}?apikey=${Lolkey}&text=${quer}`, {method: 'get'})
			    teks = `*From :* ${anu.result.from}\n\n*To :* ${anu.result.to}\n\n*Original :* ${anu.result.original}\n\n*Translated :* ${anu.result.translated}\n\n*Pronunciation :* ${anu.result.pronunciation}`
			    reply(teks)
			    break
              case 'timer':
				if (args[1]=="detik") {var timer = args[0]+"000"
				} else if (args[1]=="menit") {var timer = args[0]+"0000"
				} else if (args[1]=="jam") {var timer = args[0]+"00000"
				} else {return reply("*pilih:*\ndetik\nmenit\njam")}
				setTimeout( () => {
				reply("Waktu habis")
				}, timer)
				break
            case 'xviddl':
                quer = body.slice(8)
                vide = await fetchJson(`https://mnazria.herokuapp.com/api/porndownloadxvideos?url=${quer}`, {method: 'get'})
                shortt = await fetchJson(`https://naufalhoster.xyz/tools/tinyurl?apikey=${Nopalkey}&url=${vide.mp4}`, {method: 'get'})
                reply(`Link download:\n${shortt.result.shortUrl}`)
                break
              case 'xvideos':
			   reply(mess.wait)
              	    if (args.length < 1) return reply('teksnya mana?')
                    tek = body.slice(9)
                    cr7 = '*_PORNHUB - SEARCH_*'
                    anu = await fetchJson(`https://mnazria.herokuapp.com/api/porn?search=${tek}`, {method: 'get'})
                    teks = `*Pronhub Search*\n\n__________________________\n\n`
                    for (let i = 0; i < anu.result.length; i++) {
                    teks += `Title: ${anu.result[i].title}\n\nAktor: ${anu.result[i].actors}\n\nDurasi: ${anu.result[i].duration}\n\nLink: ${anu.result[i].url}\n__________________________\n\n`
                    }
                    reply(teks)
			     	break 
			case 'imagetag':
					var group = await lindow.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					buffer = "https://i.ibb.co/PGvrH8T/IMG-20210220-WA0056.jpg"
					buf = await getBuffer(buffer)
					lindow.sendMessage(from, buf, image, {contextInfo: {
					    mentionedJid: mem}, quoted: lin
					})
					break
            case 'hidetag':
					var value = body.slice(9)
					var group = await lindow.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: lin
					}
					await costum(options, text, text, tescuk, cr)
					break
            case 'stikertag':
					reply('premium, contact me via WhatsApp')
					break
            case 'imagelist':
			case 'listimage':
				teks = '*List Image :*\n\n'
				for (let awokwkwk of imagenye) {
					teks += `- ${awokwkwk}\n`
				}
				teks += `\n*Total : ${imagenye.length}*`
				lindow.sendMessage(from, teks.trim(), extendedText, { quoted: lin, contextInfo: { "mentionedJid": imagenye } })
				break
            case 'getimage':
				namastc = body.slice(10)
				buffer = fs.readFileSync(`./src/image/${namastc}.jpeg`)
				lindow.sendMessage(from, buffer, image, {quoted: {
                key: {
                fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? {
                remoteJid: "status@broadcast"
                }: {})
                }, message: { conversation: `Result for database : ${namastc}.jpg` }}})
				break
            case 'addimage':
				if (!isQuotedImage) return reply('Reply imagenya blokk!')
				svst = body.slice(10)
				if (!svst) return reply('Nama imagenya apa su?')
				boij = JSON.parse(JSON.stringify(lin).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await lindow.downloadMediaMessage(boij)
				imagenye.push(`${svst}`)
				fs.writeFileSync(`./src/image/${svst}.jpeg`, delb)
				fs.writeFileSync('./src/image/image.json', JSON.stringify(imagenye))
				lindow.sendMessage(from, `Sukses Menambahkan Video\nCek dengan cara ${prefix}listimage`, MessageType.text, { quoted: lin })
				break
        case 'speed':
          reply('bikin lin udah dihapus')
          break
        case 'decoctal':
				decoc = `${body.slice(10)}`
					anu = await fetchJson(`https://api.anoncybfakeplayer.com/api/octal/?decode=${decoc}`, {method: 'get'})
					lindow.sendMessage(from, `${anu.result}`, text, {quoted: lin})
					break  
            case 'encoctal':
				encoc = `${body.slice(10)}`
					anu = await fetchJson(`https://api.anoncybfakeplayer.com/api/octal/?encode=${encoc}`, {method: 'get'})
					lindow.sendMessage(from, `${anu.result}`, text, {quoted: lin})
					break
        case 'encode32':
				encode32 = `${body.slice(10)}`
					anu = await fetchJson(`https://api.i-tech.id/hash/bs32?key=TrzDwA-gT8ZNu-xJWUZT-TAUYD5-W6HIOV&type=encode&string=${encode32}`, {method: 'get'})
					lindow.sendMessage(from, `${anu.result}`, text, {quoted: lin})
					break
            case 'decode32':
				encode32 = `${body.slice(10)}`
					anu = await fetchJson(`https://api.i-tech.id/hash/bs32?key=TrzDwA-gT8ZNu-xJWUZT-TAUYD5-W6HIOV&type=decode&string=${encode32}`, {method: 'get'})
					lindow.sendMessage(from, `${anu.result}`, text, {quoted: lin})
					break
            case 'encode64':
                encode = body.slice(10)
                anu = await fetchJson(`https://naufalhoster.xyz/utils/base64?apikey=${Nopalkey}&type=encode&string=${encode}`)
                reply(`${anu.result.encrypt}`)
                break
            case 'decode64':
                encode = body.slice(10)
                anu = await fetchJson(`https://naufalhoster.xyz/utils/base64?apikey=${Nopalkey}&type=decode&string=${encode}`)
                reply(`${anu.result.encrypt}`)
                break
            case 'tes':
                   const a2 = '```'
                   const timestamp2 = speed();
                   const latensi2 = speed() - timestamp2
                   const pingnya2 = `${a2}Speed:${a2}\n${a2}◪ ${latensi2.toFixed(4)} Second${a2}`
                   lindow.sendMessage(from, pingnya2, text, {
                quoted: {
                key: {
                fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? {
                remoteJid: "status@broadcast"
                }: {})
                }, message: {
                 "liveLocationMessage":{"degreesLatitude":-6.323648333333334,"degreesLongitude":107.04117,"sequenceNumber":"1615000434776001","jpegThumbnail":fs.readFileSync(`./image/mega.jpg`)}
                      }
                    }
                      })
                    buffer = fs.readFileSync(`./src/audio/bakav2.mp3`)
                    lindow.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', quoted: lin, ptt: true })
				break
            case 'eval':
		    case 'run':
			const q = args.join(' ').toString('utf8')
			if (!q) return reply('Harap masukkan code JavaScript!')
			try {
			let evaled = await eval(q)
			if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
			} catch (e) {
			reply(e)
			}
		break
            case 'nulis':
			case 'tulis':
				  lindow.updatePresence(from, Presence.composing)
			      if (args.length < 1) return reply(`*Usage :*\n${prefix}nulis yourtext\n\n*Ex :*\n${prefix}nulis Tes123`)
			      reply(mess.wait)
					tulis = body.slice(7)
					nulis = await getBuffer(`http://api.lolhuman.xyz/api/nulis?apikey=${Lolkey}&text=${tulis}`, {method: 'get'})
					lindow.sendMessage(from, nulis, image, {quoted: lin})
					break
             case 'kicktime':
                    crkick = '*WARNING!!*'
					if (lin.message.extendedTextMessage === undefined || lin.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
					mentioned = lin.message.extendedTextMessage.contextInfo.mentionedJid
					setTimeout( () => {
					reply('Done!')
					}, 8000)
					setTimeout( () => {
					lindow.groupRemove(from, mentioned)
					}, 7000)
					setTimeout( () => {
					costum(`User akan segera di kick`, text, tescuk, crkick) 
					}, 6000)
					setTimeout( () => {
					costum('Set time..', text, tescuk, crkick)
					}, 3500)
					setTimeout( () => {
					costum('Perintah diterima!', text, tescuk, crkick)
					}, 0)
					break
            case 'tebak':
                anu = await fetchJson(`http://api.lolhuman.xyz/api/tebak/caklontong?apikey=${Lolkey}`, {method: 'get'})
            reply(`Pertanyaan : ${anu.result.question}`)
            reply(`*Sisa* 30 Detik `)
            await sleep(10000)
            reply(`*Sisa* 20 Detik `)
            await sleep(10000)
            reply(`*Sisa* 10 Detik `)
            await sleep(10000)
            reply(`Jawaban : ${anu.result.answer}`)
					break
             case 'pinterest':
                    cr14 = '*_PINTEREST - SEARCH_*'
					lindow.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=${body.slice(11)}`, {method: 'get'})
					await costum('Loading...', text, tescuk, cr14)
					pin = body.slice(11)
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					lindow.sendMessage(from, pok, image, { quoted: lin, caption: `*Succes!*\n\nHasil pencarian dari : *${pin}*`})
					break
			case 'setstatus':
			        reply('premium, contact me via WhatsApp')
    				break
				case 'blocklist': 
					teks = 'Block List :\n'
					for (let block of blocked) {
						teks += `┣➢ @${block.split('@')[0]}\n`
					}
					teks += `𝗧𝗼𝘁𝗮𝗹 : ${blocked.length}`
					lindow.sendMessage(from, teks.trim(), extendedText, {quoted: lin, contextInfo: {"mentionedJid": blocked}})
					break
           case 'fordward':
	   lindow.sendMessage(from, `${body.slice(10)}`, MessageType.text, {contextInfo: { forwardingScore: 508, isForwarded: true }})
           break
            case 'fordward1':
           lindow.sendMessage(from, `${body.slice(11)}`, MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }})
           break
		case 'moddroid':
			data = await fetchJson(`https://tobz-api.herokuapp.com/api/moddroid?q=${body.slice(10)}&apikey=BotWeA`)
			hepi = data.result[0] 
			teks = `*Apk name :* ${data.result[0].title}\n\n*Publisher :* ${hepi.publisher}\n\n*Mod info :* ${hepi.mod_info}\n\n*Size :* ${hepi.size}\n\n*Latest version :* ${hepi.latest_version}\n\n*Genre :* ${hepi.genre}\n\n*Link :* ${hepi.link}\n\n*Download :* ${hepi.download}`
			buff = await getBuffer(hepi.image)
			lindow.sendMessage(from, buff, image, {quoted: lin, caption: `${teks}`})
			break
        case 'getaudio':
            data = await fetchJson(`http://api.lolhuman.xyz/api/ytaudio?apikey=${Lolkey}&url=${body.slice(7)}`)
           shortt = await fetchJson(`https://naufalhoster.xyz/tools/tinyurl?apikey=${Nopalkey}&url=${data.result.link[0].link}`, {method: 'get'})
           if (Number(data.result.link[0].size.split(' MB')[0]) >= 30.00) return reply(`*Data Berhasil Didapatkan!*\n\n*Title :* ${data.result.title}\n*Uploader :* ${data.result.uploader}\n\n*Duration :* ${data.result.duration}\n*View :* ${data.result.view}\n*Like :* ${data.result.like}\n*Dislike :* ${data.result.dislike}\n\n*Filesize* : ${data.result.link[0].size}\n\n*Link* : ${shortt.result.shortUrl}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`)
           teks = `*YTMP3 DOWNLOADER*\n\n*Title :* ${data.result.title}\n*Uploader :* ${data.result.uploader}\n\n*Duration :* ${data.result.duration}\n*View :* ${data.result.view}\n*Like :* ${data.result.like}\n*Dislike :* ${data.result.dislike}\n\n*Description :* ${data.result.description}\n\n*Bitrate :* ${data.result.link[0].bitrate}\n*Size :* ${data.result.link[0].size}\n\nWait a minute, sending audio..`
           reply(teks)
           buff = await getBuffer(data.result.link[0].link)
           lindow.sendMessage(from, buff, audio, {mimetype: 'audio/mp4', filename: `${data.title}.mp3`, quoted: lin})
           break
        case 'scplay':
            data = await fetchJson(`https://naufalhoster.xyz/dl/scdlplay?apikey=${Nopalkey}&query=${body.slice(8)}`, {method: 'get'})
            teks = `*SOUNDCLOUD - PLAY*\n\nTitle : ${data.result.title}\n\nGenre : ${data.result.genre}\n\nPublished : ${data.result.published_at}\n\nFilesize : ${data.result.filesize}`
            thumb = await getBuffer(data.result.thumbnail)
            lindow.sendMessage(from, thumb, image, {quoted: lin, caption: teks})
            musik = await getBuffer(data.result.music)
            lindow.sendMessage(from, musik, audio, {mimetype: 'audio/mp4', filename: `${data.result.title}.mp3`, quoted: lin})
            break
        case 'ytmp3':
           data = await fetchJson(`http://api.lolhuman.xyz/api/ytaudio?apikey=${Lolkey}&url=${body.slice(7)}`)
           shortt = await fetchJson(`https://naufalhoster.xyz/tools/tinyurl?apikey=${Nopalkey}&url=${data.result.link[0].link}`, {method: 'get'})
           if (Number(data.result.link[0].size.split(' MB')[0]) >= 30.00) return reply(`*Data Berhasil Didapatkan!*\n\n*Title :* ${data.result.title}\n*Uploader :* ${data.result.uploader}\n\n*Duration :* ${data.result.duration}\n*View :* ${data.result.view}\n*Like :* ${data.result.like}\n*Dislike :* ${data.result.dislike}\n\n*Filesize* : ${data.result.link[0].size}\n\n*Link* : ${shortt.result.shortUrl}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`)
           teks = `*YTMP3 DOWNLOADER*\n\n*Title :* ${data.result.title}\n*Uploader :* ${data.result.uploader}\n\n*Duration :* ${data.result.duration}\n*View :* ${data.result.view}\n*Like :* ${data.result.like}\n*Dislike :* ${data.result.dislike}\n\n*Description :* ${data.result.description}\n\n*Bitrate :* ${data.result.link[0].bitrate}\n*Size :* ${data.result.link[0].size}\n\nWait a minute, sending audio..`
           reply(teks)
           buff = await getBuffer(data.result.link[0].link)
           lindow.sendMessage(from, buff, audio, {mimetype: 'audio/mp4', filename: `${data.title}.mp3`, quoted: lin})
           break
        case 'xnxx':
            data = await fetchJson(`http://api.lolhuman.xyz/api/xnxx?apikey=${Lolkey}&url=${body.slice(6)}`, {method: 'get'})
            short1 = await fetchJson(`https://naufalhoster.xyz/tools/tinyurl?apikey=${Nopalkey}&url=${data.result.link[0].link}`, {method: 'get'})
            short2 = await fetchJson(`https://naufalhoster.xyz/tools/tinyurl?apikey=${Nopalkey}&url=${data.result.link[1].link}`, {method: 'get'})
            short3 = await fetchJson(`https://naufalhoster.xyz/tools/tinyurl?apikey=${Nopalkey}&url=${data.result.link[2].link}`, {method: 'get'})
            Link = `Link SD : ${short1.result.shortUrl}\n\nLink HD : ${short2.result.shortUrl}\n\nLink FullHD : ${short3.result.shortUrl}`
            teks = `Title : ${data.result.title}\n\nDuration : ${data.result.duration}\nView : ${data.result.view}\nRating : ${data.result.rating}\nLike : ${data.result.like}\nDislike : ${data.result.dislike}\n\n` + Link
             thumb = await getBuffer(data.result.thumbnail)
             lindow.sendMessage(from, thumb, image, {quoted: lin, caption: teks})
             break
        case 'igdl':
                    ini_url = body.slice(6)
                    ini_url = await fetchJson(`http://api.lolhuman.xyz/api/instagram?apikey=${Lolkey}&url=${ini_url}`)
                    ini_url = ini_url.result
                    ini_type = image
                    if (ini_url.includes(".mp4")) ini_type = video
                    buffer = await getBuffer(ini_url)
                    lindow.sendMessage(from, buffer, ini_type, { quoted: lin })
                    break
        case 'encbinary':
			encbinary = `${body.slice(11)}`
					anu = await fetchJson(`https://api.anoncybfakeplayer.com/api/binary/?encode=${encbinary}`, {method: 'get'})
					lindow.sendMessage(from, `${anu.result}`, text, {quoted: lin})
					break
       case 'decbinary':
				decbin = `${body.slice(11)}`
					anu = await fetchJson(`https://api.anoncybfakeplayer.com/api/binary/?decode=${decbin}`, {method: 'get'})
					lindow.sendMessage(from, `${anu.result}`, text, {quoted: lin})
					break
        case 'pastebin':
                  reply(mess.wait)
				paste = `${body.slice(10)}`
                   anu = await fetchJson(`https://api-anoncybfakeplayer.herokuapp.com/pastebin?text=${paste}`, {method: 'get'})
                   lindow.sendMessage(from, `${anu.result}`, text, {quoted: lin})
                   break 
        case 'ytmp4':
            teks = body.slice(7)
           data = await fetchJson(`http://api.lolhuman.xyz/api/ytvideo?apikey=lindowganteng123&url=${teks}`, {method: 'get'})
           if (Number(data.result.link[0].size.split(' MB')[0]) >= 40.00) return reply(`*Data Berhasil Didapatkan!*\n\n*Title :* ${data.result.title}\n*Uploader :* ${data.result.uploader}\n\n*Duration :* ${data.result.duration}\n*View :* ${data.result.view}\n*Like :* ${data.result.like}\n*Dislike :* ${data.result.dislike}\n\n*Filesize* : ${data.result.link[0].size}\n\n*Link* : ${data.result.link[0].link}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`)
           teks = `*YTMP4 DOWNLOADER*\n\n*Title :* ${data.result.title}\n*Uploader :* ${data.result.uploader}\n\n*Duration :* ${data.result.duration}\n*View :* ${data.result.view}\n*Like :* ${data.result.like}\n*Dislike :* ${data.result.dislike}\n\n*Description :* ${data.result.description}\n\n*Resolution :* ${data.result.link[0].resolution}\n*Size :* ${data.result.link[0].size}\n\nWait a minute, sending audio..`
           reply(teks)
           buff = await getBuffer(data.result.link[0].link)
           lindow.sendMessage(from, buff, video)
           break
           case 'playvideo2':
            const querv = body.slice(12)
            reply(mess.wait)
            try {
                const jsonsercmuv = await get.get(`http://nzcha-apii.herokuapp.com/ytsearch?q=${encodeURIComponent(querv)}`).json()
                const { result } = await jsonsercmuv
                let xixixai = `*Hasil pencarian from ${querv}*\n\n_Note : Apabila kesusahan mengambil data id, untuk download video tag pesan ini dan berikan perintah : *!getvideo urutan* contoh : *!getvideo 2*_\n`
                for (let i = 0; i < result.length; i++) {
                    xixixai += `\n*Urutan* : ${i+1}\n*Title* : ${result[i].title}\n*Channel* : ${result[i].author}\n*Durasi* : ${result[i].timestamp}\n*Perintah download* : _!getvideo ${result[i].id}_\n`
                }
                    xixixai += `\n\n`
                for (let ii = 0; ii < result.length; ii++) {
                    xixixai += `(#)${result[ii].id}`
                }
                buffer = await getBuffer(result[0].thumb)
                await lindow.sendMessage(from, buffer, image, {quoted: lin, caption: xixixai})
            } catch (e){
               reply('yahh error nyet')
            }
            break
            case 'playvideo':
                var querrg2 = body.slice(11)
               data = await fetchJson(`http://api.lolhuman.xyz/api/ytplay/${querrg2}?apikey=${Lolkey}`)
               buff = await getBuffer(data.result.info.thumbnail)
               if (Number(data.result.video[0].size.split(' MB')[0]) >= 20.00) return lindow.sendMessage(from, buff, image, {quoted: lin, caption: `*Data Berhasil Didapatkan!*\n\n*Title :* ${data.result.info.title}\n*View :* ${data.result.info.views}\n*Like :* ${data.result.info.like}\n*Dislike :* ${data.result.info.dislike}\n\n*Filesize* : ${data.result.video[0].size}\n\n*Link* : ${data.result.video[0].link}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`})
               teks = `*PLAY VIDEO*\n\n*Title :* ${data.result.info.title}\n\n*View :* ${data.result.info.views}\n*Like :* ${data.result.info.like}\n*Dislike :* ${data.result.info.dislike}\n\n*Resolution:* ${data.result.video[0].resolution}\n*Size :* ${data.result.video[0].size}\n\nWait a minute, sending video..`
           thumb = await getBuffer(data.result.info.thumbnail)
           lindow.sendMessage(from, thumb, image, {quoted: lin, caption: teks})
           buff = await getBuffer(data.result.video[0].link)
           lindow.sendMessage(from, buff, video, {mimetype: 'video/mp4', filename: `${data.result.info.title}.mp4`, quoted: lin})
               break
            case 'play':
               var querrg = body.slice(6)
               data = await fetchJson(`https://naufalhoster.xyz/dl/ytplayaudio?apikey=${Nopalkey}&query=${querrg}`, {method: 'get'})
               buff = await getBuffer(data.result.thumbnail)
               if (Number(data.result.filesize.split(' MB')[0]) >= 20.00) return lindow.sendMessage(from, buff, image, {quoted: lin, caption: `*Data Berhasil Didapatkan!*\n\n*Title :* ${data.result.title}\n*View :* ${data.result.viewCount}\n*Like :* ${data.result.likeCount}\n*Dislike :* ${data.result.dislikeCount}\n\n*Filesize* : ${data.result.filesize}\n\n*Link* : ${data.result.audio}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`})
               teks = `*PLAY MUSIC*\n\n*Title :* ${data.result.title}\n\n*View :* ${data.result.viewCount}\n*Like :* ${data.result.likeCount}\n*Dislike :* ${data.result.dislikeCount}\n\n*Size :* ${data.result.filesize}\n\nWait a minute, sending audio..`
           reply(teks)
           buff = await getBuffer(data.result.audio)
           lindow.sendMessage(from, buff, audio, {mimetype: 'audio/mp3', filename: `${data.result.title}.mp3`, quoted: lin})
                    break
            case 'getvideo':
                data = await f(`http://api.lolhuman.xyz/api/ytvideo?apikey=${Lolkey}&url=https://youtu.be/${body.slice(10)}`)
                if (Number(data.result.link[0].size.split(' MB')[0]) >= 40.00) return reply(`*Data Berhasil Didapatkan!*\n\n*Title :* ${data.result.title}\n*Uploader :* ${data.result.uploader}\n\n*Duration :* ${data.result.duration}\n*View :* ${data.result.view}\n*Like :* ${data.result.like}\n*Dislike :* ${data.result.dislike}\n\n*Filesize* : ${data.result.link[0].size}\n\n*Link* : ${data.result.link[0].link}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`)
                teks = `*YTMP4 DOWNLOADER*\n\n*Title :* ${data.result.title}\n*Uploader :* ${data.result.uploader}\n\n*Duration :* ${data.result.duration}\n*View :* ${data.result.view}\n*Like :* ${data.result.like}\n*Dislike :* ${data.result.dislike}\n\n*Description :* ${data.result.description}\n\n*Resolution :* ${data.result.link[0].resolution}\n*Size :* ${data.result.link[0].size}\n\nWait a minute, sending audio..`
           reply(teks)
           buff = await getBuffer(data.result.link[0].link)
           lindow.sendMessage(from, buff, video, {mimetype: 'video/mp4', filename: `${data.result.title}.mp4`, quoted: lin})
           break
            case 'pinterestdl':
                    ini_url = args[0]
                    ini_url = await fetchJson(`http://lolhuman.herokuapp.com/api/pinterestdl?apikey=${Lolkey}&url=${ini_url}`)
                    ini_url = ini_url.result["736x"]
                    buffer = await getBuffer(ini_url)
                    lindow.sendMessage(from, buffer, image, { quoted: lin })
                    break
        case 'github':
                    git = body.slice(8)
                    anu = await fetchJson(`http://api.lolhuman.xyz/api/github/${git}?apikey=${Lolkey}`, {method: 'get'}) // GET IN api.lolhuman.xyz
                    teks = `*Name :* ${anu.result.name}\n*Followers :* ${anu.result.followers}\n*Following :* ${anu.result.following}\n*Repositories :* ${anu.result.public_repos}\n*Gits :* ${anu.result.public_gits}\n*Type :* ${anu.result.type}\n*Company :* ${anu.result.company}\n*Location :* ${anu.result.location}\n*Email :* ${anu.result.email}\n*Bio :* ${anu.result.bio}\n*Url :* ${anu.result.url}`
                    pepek = await getBuffer(anu.result.avatar)
                    lindow.sendMessage(from, pepek, image, {quoted: lin, caption: `${teks}`})
                    break
        case 'igstalk':
                  ig = body.slice(9)
                  anu = await fetchJson(`https://naufalhoster.xyz/dl/igstalk?apikey=${Nopalkey}&username=${ig}`, {method: 'get'})
                  teks = `*Username :* ${anu.result.username}\n\n*Name :* ${anu.result.fullName}\n\n*Bio :* ${anu.result.biography}\n\n*Followers :* ${anu.result.followerCount}\n\n*Following :* ${anu.result.followingCount}\n\n*Bussines account :* ${anu.result.isBusinessAccount}\n\n*Private :* ${anu.result.isPrivateAccount}\n\n*Verived :* ${anu.result.isVerifiedAccount}\n\n*Category :* ${anu.result.accountCategory}\n\n*Post count :* ${anu.result.postCount}`
                  pepek = await getBuffer(anu.result.profile_picture.resolution_hd)
                  lindow.sendMessage(from, pepek, image, {quoted: lin, caption: `${teks}`})
                  break
        case 'jadwalsholat':
                  jsholat = body.slice(14)
                  anu = await fetchJson(`http://api.lolhuman.xyz/api/sholat/${jsholat}?apikey=beta`, {method: 'get'})
                  teks = `*Jadwal sholat wilayah ${anu.result.wilayah} tanggal ${anu.result.tanggal}*\n\nWilayah : ${anu.result.wilayah}\nImsak  ${anu.result.imsak}\nSubuh ${anu.result.subuh}\nTerbit  ${anu.result.terbit}\nDhuha  ${anu.result.dhuha}\nDzuhur  ${anu.result.dzuhur}\nAshar  ${anu.result.ashar}\nMaghrib  ${anu.result.maghrib}\nIsya  ${anu.result.isya}`
                  crsho = '*_JADWAL - SHOLAT_*'
                  await costum(teks, text, tescuk, crsho)
                  break
        case 'nsfwneko':
				    try{
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwneko?apikey=BotWeA`, {method: 'get'})
						buffer = await getBuffer(res.result)
						lindow.sendMessage(from, buffer, image, {quoted: lin, caption: 'succes'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('emror bang')
					}
					break
        case 'phdl':
            data = await fetchJson(`https://naufalhoster.xyz/dl/pornhub?apikey=${Nopalkey}&url=${body.slice(6)}`)
            ph = data.result
            teksph = `*Pornhub Downloader*\n\n*Ttile :* ${ph.title}\n\n*Duration :* ${ph.duration}\n\n*Link download :* ${ph.media[0].url}`
            buff = await getBuffer(ph.thumbnail)
            lindow.sendMessage(from, buff, image, {quoted: lin, caption: teksph})
            break
        case 'getpict':
            mentioned = lin.message.extendedTextMessage.contextInfo.mentionedJid[0]
            pictt = await lindow.getProfilePicture(mentioned)
            pict = await getBuffer(pictt)
            lindow.sendMessage(from, pict, image, {quoted: lin})
            break
	    case 'film':
		data = await fetchJson(`https://tobz-api.herokuapp.com/api/film?q=${body.slice(6)}&apikey=BotWeA`, {method: 'get'})
		for (let a = 0; a < data.result.length; a++){

                short1 = await fetchJson(`https://naufalhoster.xyz/tools/tinyurl?apikey=${Nopalkey}&url=${data.result[a].link}`, {method: 'get'})
		}
		teks = `*SEARCH - FILM*`
                var nomorehh = '1'
                for (let i = 0; i < data.result.length; i++) {
                    teks += `\n\n*Urutan ${nomorehh}*\nTitle : ${data.result[i].judul}\nGenre : ${data.result[i].genre_negara}\n\nUrl : ${short1.result.shortUrl}`
                    nomorehh++
                }
                thumb = await getBuffer(data.result[0].thumb)
                lindow.sendMessage(from, thumb, image, {quoted: lin, caption: teks})
                break
    case 'jadwaltvnow':
        kontol = await fetchJson(`http://api.lolhuman.xyz/api/jadwaltv/now?apikey=${Lolkey}`)
        reply(`*Jadwal tv now*\n\nAntv : ${kontol.result.antv}\n\nGtv : ${kontol.result.antv}\n\nIndosiar : ${kontol.result.indosiar}\n\nInewstv : ${kontol.result.inewstv}\n\nKompastv : ${kontol.result.kompastv}\n\nMetrotv : ${kontol.result.metrotv}\n\nMnctv : ${kontol.result.mnctv}\n\nNET. : ${kontol.result.nettv}\n\nRcti : ${kontol.result.rcti}\n\nRtv : ${kontol.result.rtv}\n\nSctv : ${kontol.result.sctv}\n\nTrans7 : ${kontol.result.trans7}\n\nTranstv : ${kontol.result.transtv}\n\ntvOne : ${kontol.result.tvone}\n\nTvri : ${kontol.result.tvri}`)
        break
	case 'toptt':
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lindow.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Gagal mengkonversi audio ke ptt')
						topt = fs.readFileSync(ran)
						lindow.sendMessage(from, topt, audio, {mimetype: 'audio/mp4', quoted: lin, ptt:true})
						})
						break
    case 'brainly':
                    brien = body.slice(9)
                    crbran = '*_BRAINLY - SCRAPER_*'
					brainly(`${brien}`).then(res => {
					teks = '────────────\n'
					for (let Y of res.data) {
						teks += `\n*「 _BRAINLY_ 」*\n\n*➸ Pertanyaan:* ${Y.pertanyaan}\n\n*➸ Jawaban:* ${Y.jawaban[0].text}\n───────────\n`
					}
				    costum(teks, text, tescuk, crbran)
                        console.log(res)
                    })
					break 
	case 'randomanime':
					reply(mess.wait)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomanime?apikey=BotWeA`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					lindow.sendMessage(from, buffer, image, {quoted: lin})
					break	
    case 'ssweb':
					if (args.length < 1) return reply('urlnya mana lit?')
					teks = body.slice(7)
					reply('Wait...')
					anu = await fetchJson(`https://naufalhoster.xyz/tools/ssweb?apikey=${Nopalkey}&url=${teks}`)
					buff = await getBuffer(anu.result.image)
					lindow.sendMessage(from, buff, image, {quoted: lin})
					break
	case 'randomquran':
			data = await fetchJson(`https://api.zeks.xyz/api/randomquran`)
			teks = `Nama : ${data.result.nama}\nArti: ${data.result.arti}\nayat: ${data.result.ayat}\nAsma: ${data.result.asma}\nRukuk: ${data.result.rukuk}\nNomor: ${data.result.nomor}\nType: ${data.result.type}\nKeterangan: ${data.result.keterangan}`
			buffs = await getBuffer(data.result.audio)
			await costum(teks, text, tescuk, cr)
			lindow.sendMessage(from, buffs, audio, {mimetype: 'audio/mp4', filename: `quran.mp3`, quoted: lin})
			break
                case 'neko':
                case 'waifu':
                case 'loli':
                case 'chiisaihentai':
                case 'trap':
                case 'blowjob':
                case 'yaoi':
                case 'ecchi':
                case 'hentai':
                case 'ahegao':
                case 'hololewd':
                case 'sideoppai':
                case 'animefeets':
                case 'animebooty':
                case 'animethighss':
                case 'hentaiparadise':
                case 'animearmpits':
                case 'hentaifemdom':
                case 'lewdanimegirls':
                case 'biganimetiddies':
                case 'animebellybutton':
                case 'hentai4everyone':
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/random/nsfw/${command}?apikey=${Lolkey}`)
                    lindow.sendMessage(from, buffer, image, { quoted: lin })
                    break
    case 'wallpaper':
            anu = await fetchJson(`http://api.lolhuman.xyz/api/wallpaper?apikey=${Lolkey}&query=${body.slice(11)}`, {method: 'get'})
            po = await getBuffer(anu.result)
            lindow.sendMessage(from, po, image, {quoted: lin})
            break
            case 'upname':
                reply('premium, contact me via WhatsApp')
                break
                case 'bj':
                case 'ero':
                case 'cum':
                case 'feet':
                case 'yuri':
                case 'ngif':
                case 'lewd':
                case 'feed':
                case 'eron':
                case 'solo':
                case 'gasm':
                case 'poke':
                case 'anal':
                case 'holo':
                case 'tits':
                case 'kuni':
                case 'erok':
                case 'smug':
                case 'baka':
                case 'solog':
                case 'feetg':
                case 'lewdk':
                case 'cuddle':
                case 'eroyuri':
                case 'cum_jpg':
                case 'erofeet':
                case 'holoero':
                case 'classic':
                case 'erokemo':
                case 'fox_girl':
                case 'futanari':
                case 'lewdkemo':
                case 'pussy_jpg':
                case 'kemonomimi':
                case 'nsfw_avatar':
                case 'nsfw_neko_gif':
                case 'random_hentai_gif':
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/random2/${command}?apikey=${Lolkey}`)
                    lindow.sendMessage(from, buffer, image, { quoted: lin})
                    break
	case 'ocr': 
					if ((isMedia && !lin.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo : lin
						const media = await lindow.downloadAndSaveMediaMessage(encmedia)
						reply(mess.wait)
						await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							.catch(err => {
								reply(err.message)
								fs.unlinkSync(media)
							})
					} else {
						reply(`Kirim foto lalu reply dengan ${prefix}ocr`)
					}
					break
				case 'fml':
					data = await fetchJson(`https://tobz-api.herokuapp.com/api/randomfmylife?apikey=BotWeA`)
					teks  = `${data.result}`
					cr8= '*_FUCK MY LIFE_*'
					lindow.sendMessage(from, teks, text, {
                       quoted: {
                       key: {
                       fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? {
                remoteJid: `6289513946766-1614335465@g.us`
                }: {})
                }, message: {
                    "audioMessage":{"url":"https://mmg.whatsapp.net/d/f/AiK7xYTOeDzW9vlmhaL7H8xcJmR_3S3cApUx_g3VFVlH.enc","mimetype":"audio/mp4","fileSha256":"E2+iQCls2RoadrR2DTnAHFzYfvZISFAb8MhEV460+Qg=","fileLength":"221009","seconds":1000000000,"ptt":true,"mediaKey":"zQGw5i5gsZ0Uep5w0Ktk/mfSh8SNvIzJEcrpg58lmfo=","fileEncSha256":"O2K89/VuRVNAAcG+iiQxr1SWZzUabm5V7VdJDSkgueY=","mediaKeyTimestamp":"1614234551","contextInfo":{"forwardingScore":999,"isForwarded":true}}}}})
					break
				case 'stiker':
			    case 's':
				case 'sticker':
				case 'stickergif':
				case 'stikergif':
					if ((isMedia && !lin.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo : lin
						const media = await lindow.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								lindow.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: lin})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
						} else if ((isMedia && !lin.message.imageMessage || isQuotedVideo) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo : lin
						const media = await lindow.downloadAndSaveMediaMessage(encmedia)
						if (Buffer.byteLength(media) >= 6186598.4) return reply(`sizenya terlalu gede sayang, dd gakuat :(`)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								lindow.sendMessage(from, `Gagal, video nya kebesaran, dd gakuat`, MessageType.text)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								lindow.sendMessage(from, buff, sticker, {quoted: lin})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
						}
						break
                 case 'nekonime':
                    data = await fetchJson('https://waifu.pics/api/sfw/neko')
                    hasil = await getBuffer(data.url)
                    await costum(hasil, image, text, tescuk, cr)
                  break
                case 'tomp3':
                	lindow.updatePresence(from, Presence.composing) 
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lindow.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp4')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Gagal, pada saat mengkonversi video ke mp3')
						buff = fs.readFileSync(ran)
						lindow.sendMessage(from, buff, audio, {mimetype: 'audio/mp4', quoted: lin})
						fs.unlinkSync(ran)
					})
					break
                case 'map':
               	 anu = await fetchJson(`https://mnazria.herokuapp.com/api/maps?search=${body.slice(5)}`, {method: 'get'})
               	 buffer = await getBuffer(anu.gambar)
              	  lindow.sendMessage(from, buffer, image, {quoted: lin, caption: `${body.slice(5)}`})
				break
                case 'lirik':
				anu = await fetchJson(`https://tobz-api.herokuapp.com/api/lirik?q=${body.slice(7)}&apikey=BotWeA`)
				thum = await getBuffer(anu.result.thumb)
				teks = `*「 LAGU DI TEMUKAN 」*\n\n*Judul* : ${anu.result.judul}\n*Album* : ${anu.result.album}\n*public in* : ${anu.result.dipublikasi}\n*Lyrics* : ${anu.result.lirik}`
				lindow.sendMessage(from, thum, image, { quoted : lin, caption: teks })
				break
				case 'tts':
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return lindow.sendMessage(from, 'Textnya mana om', text, {quoted: lin})
					dtt = body.slice(8)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 600
					? reply('Textnya kebanyakan om')
					: gtts.save(ranm, dtt, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buff = fs.readFileSync(rano)
							if (err) return reply('Gagal om:(')
							lindow.sendMessage(from, buff, audio, {quoted: lin, ptt:true})
							fs.unlinkSync(rano)
						})
					})
				break
				case 'setprefix':
					if (args.length < 1) return
					prefix = args[0]
					cr5 = '*_CHANGE - PREFIX_*'
					await costum(`Succes change prefix to : ${prefix}`, text, tescuk, cr5)
					break 	
		        case 'imgbb':
		            enmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lindow.downloadAndSaveMediaMessage(enmedia)
					anu = await imgbb("1cf4d50db9a95c32b4f1b1c199183373", media)
					teks = `${anu.display_url}`
					reply(teks)
					break
		        case 'setthumb':
		            reply('premium, contact me via WhatsApp')
                    break
                case 'sethelpimg':
                    reply('premium, contact me via WhatsApp')
                    break
			       case 'pussy':
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://nekos.life/api/v2/img/pussy', {method: 'get'})
					if (anu.error) return reply(anu.error)

					exec(`wget ${anu.url} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buff = fs.readFileSync(rano)
						lindow.sendMessage(from, buff, sticker, {quoted: lin})
						fs.unlinkSync(rano)
					})
					break
            case 'nsfwgif':
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://nekos.life/api/v2/img/nsfw_neko_gif', {method: 'get'})
					if (anu.error) return reply(anu.error)

					exec(`wget ${anu.url} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buff = fs.readFileSync(rano)
						lindow.sendMessage(from, buff, sticker, {quoted: lin})
						fs.unlinkSync(rano)
					})
					break
            case 'tabok':
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://nekos.life/api/v2/img/spank', {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.url} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buff = fs.readFileSync(rano)
						lindow.sendMessage(from, buff, sticker, {quoted: lin})
						fs.unlinkSync(rano)
					})
					break
            case 'kiss':
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://nekos.life/api/v2/img/kiss', {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.url} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buff = fs.readFileSync(rano)
						lindow.sendMessage(from, buff, sticker, {quoted: lin})
						fs.unlinkSync(rano)
					})
					break	
				case 'meme': 
				    cr10 = '*_MEME - TOOLS_*'
				    await costum('Searching meme...', text, tescuk, cr10)
					meme = await kagApi.memes()
					buffer = await getBuffer(`https://imgur.com/${meme.hash}.jpg`)
					lindow.sendMessage(from, buffer, image, {quoted: lin, caption: '.......'})
					break
		case 'kapankah':
					const kapan1 = (0)
					const kapan2 = [
					'Hari ini',

					'Mungkin besok',

					'1 Minggu lagi',

					'Masih lama',

					'3 Bulan lagi',

					'7 Bulan lagi',

					'3 Tahun lagi',

					'4 Bulan lagi',

					'2 Bulan lagi',

					'1 Tahun lagi',

					'1 Bulan lagi',

					'Coba ulangi',

					]

					const kpnkh = kapan2[Math.floor(Math.random() * (kapan2.length))]

					const jawab1 = `Pertanyaan : *${kapan1}*\n\nJawaban: ${kpnkh}`
                    
					await costum(jawab1, text, tescuk, cr)

					break
			case 'apakah':
					const tanya = body.slice(1)
					const apa = [
					'Ya',

					'Mungkin',

					'Tidak',

					'Coba Ulangi',
					
					'Iya kali',

					]

					const apkh = apa[Math.floor(Math.random() * (apa.length))]

					const jawab = `Pertanyaan : *${tanya}*\n\nJawaban: ${apkh}`

					await costum(jawab, text, tescuk, cr)

					break
			case 'darkjoke':
				 data = fs.readFileSync('./src/darkjokes.js');
                 jsonData = JSON.parse(data);
                 randIndex = Math.floor(Math.random() * jsonData.length);
                 randKey = jsonData[randIndex];
                hasil = await getBuffer(randKey.result)
                sendImage(hasil, lin)
				break
			case 'memeind':
                                crmek = '*_Searching - meme_*'
			                    costum('Searching meme...', text, tescuk, crmek)
                    data = await fetchJson(`https://naufalhoster.xyz/tools/memeindo?apikey=${Nopalkey}`)
                    thumb = await getBuffer(data.result.meme)
                                lindow.sendMessage(from, thumb, image, {quoted: lin})
                                break
				case 'holoh': 
					if (args.length < 1) return reply('teks nya mana sayang?')
					anu = await fetchJson(`https://shirayuki-api.herokuapp.com/api/v1/holoh?kata=${body.slice(7)}`, {method: 'get'})
					cr12 = '*_TEXT - TOOLS_*'
					teks = `${anu.result}`
					await costum(teks, text, tescuk, cr12)
					break
				case 'terbalik':
					if (args.length < 1) return reply('teks nya mana sayang?')
					meki = await fetchJson(`https://videfikri.com/api/hurufterbalik/?query=${body.slice(10)}`)
					lindow.sendMessage(from, `Input: ${body.slice(10)}\nOutput: ${meki.result.kata}`, MessageType.text, {quoted: lin})
					break
				case 'huruf':
					if (args.length < 1) return reply('teks nya mana sayang?')
					meki = await fetchJson(`https://videfikri.com/api/jumlahhuruf/?query=${body.slice(7)}`)
					lindow.sendMessage(from, `Input: ${body.slice(6)}\nJumlah Huruf: ${meki.result.jumlah}`, MessageType.text, {quoted: lin})
					break
				case 'hilih': 
					if (args.length < 1) return reply('teks nya mana sayang?')
					anu = await fetchJson(`https://mhankbarbar.tech/api/hilih?teks=${body.slice(7)}`, {method: 'get'})
					reply(anu.result)
					break
			// case 'joox':
					data = await fetchJson(`https://tobz-api.herokuapp.com/api/joox?q=${body.slice(6)}&apikey=BotWeA`, {method: 'get'})
					teks = ''
					const joox = data.result
					teks += `*Title :* ${joox.judul}\n\n*Album :* ${joox.album}\n\n*Published :* ${joox.dipublikasi}\n\n*Link :* ${joox.mp3}`
					thumb = await getBuffer(joox.thumb)
					lindow.sendMessage(from, thumb, image, {quoted: lin, caption: teks})
					buffer = await getBuffer(joox.mp3)
					lindow.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${joox.title}.mp3`, quoted: lin})
					break
            case 'quotesnime':
                   crquotesnime = '*_QUOTES - ANIME_*'
                   data = await fetchJson(`https://naufalhoster.xyz/anime/quotesnime?apikey=${Nopalkey}`, {method: 'get'})
                   teks = `*Quotes :* ${data.result.quotes}\n\n*Character :* ${data.result.character}\n\n*Anime :* ${data.result.anime}`
                   await costum(teks, text, tescuk, crquotesnime)
                   break
            case 'joox':
                   data = await fetchJson(`https://naufalhoster.xyz/dl/joox?apikey=${Nopalkey}&query=${body.slice(6)}`, {method: 'get'})
                   const joox2 = data.result
                   teks = `*Title :* ${joox2.title}\n\n*Singer :* ${joox2.singer}\n\n*Album :* ${joox2.album}\n\n*Published :* ${joox2.realease_date}\n\n*Duration :* ${joox2.duration}\n\n*Size :* ${joox2.size}\n\n*Lyrics :* ${joox2.lyric}`
                   thumb = await getBuffer(joox2.thumbnail)
                   lindow.sendMessage(from, thumb, image, {quoted: lin, caption: teks})
                   buffer = await getBuffer(joox2.mp3)
                   lindow.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${joox2.title}.mp3`, quoted: lin})
                   break
            
            case 'simi':
                    mes = body.slice(6)
                    simi = await fetchJson(`https://naufalhoster.xyz/tools/simsimi?apikey=${Nopalkey}&pesan=${mes}`, {method: 'get'})
                    reply(`${simi.result.response}`)
                    break
            case 'bucin':
                    bucin = await fetchJson(`http://api.lolhuman.xyz/api/random/katabucin?apikey=${Lolkey}`, {method: 'get'})
                    reply(`${bucin.result}`)
                    break
            case 'soundcloud':
                cr6 = '*_SOUNDCLOUD - DOWNLOADER_*'
                await costum(mess.wait, text, tescuk, cr6)
                sound = body.slice(12)
                anu = await fetchJson(`http://api.lolhuman.xyz/api/soundcloud?apikey=${Lolkey}&url=${sound}`) // GET IN api.lolhuman.xyz
                infocloud = `*SoundCloud Downloader*\n\n*Title :* ${anu.title}`
                if (anu.error) return reply(anu.message)
                buffer = await getBuffer(anu.result)
                await costum(infocloud, text, tescuk, cr6)
                lindow.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: lin})
                break
				case 'tiktok': 
				    if (args.length < 1) return reply('Urlnya mana?')
					reply(mess.wait)
					tiklin = body.slice(8)
					anu = await fetchJson(`https://naufalhoster.xyz/dl/tiktok?apikey=${Nopalkey}&url=${tiklin}`, {method: 'get'})
					teks = `*Succes downloads*\n\n*Username :* ${anu.result.username}\n\n*Caption :* ${anu.result.caption}`
					if (anu.error) return reply(anu.error)
					buffer = await getBuffer(anu.result.videoNoWatermark)
					lindow.sendMessage(from, buffer, video, {quoted: lin, caption: teks})
					break
                case 'setreply':
                    reply('premium, contact me via WhatsApp')
					break
				case 'carbon':
					if (args.length < 1)return reply('Sertakan teks nya')
					targed = lin.participant
					teks = body.slice(8)
					drc = await getBuffer(`https://carbonnowsh.herokuapp.com/?code=${teks}`)
					lindow.sendMessage(from, drc, image, {quoted: lin})
					break
				case 'tagall':
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `┣➥ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					break
				case 'clearall':
					anu = await lindow.chats.all()
					lindow.setMaxListeners(25)
					for (let _ of anu) {
						lindow.deleteChat(_.jid)
					}
					reply('succes clear all')
					break
			       case 'block':
					lindow.updatePresence(from, Presence.composing) 
					lindow.blockUser (`${body.slice(7)}@c.us`, "add")
					lindow.sendMessage(from, `perintah Diterima, memblokir ${body.slice(7)}@c.us`, text)
					break
                    case 'unblock':
				    lindow.blockUser (`${body.slice(9)}@c.us`, "remove")
    				.then(lindow.sendMessage(from, `bentar gua unblock ${body.slice(9)}@c.us`, text))
				break
				case 'leave': 
				if (!isGroup) return reply(mess.only.group)
				reply('Byee..')
				setTimeout( () => {
			    lindow.groupLeave(from, groupId)
				}, 3000)
                    break
                case 'chat':
var pc = body.slice(6)
var nomor = pc.split("|")[0];
var org = pc.split("|")[1];
lindow.sendMessage(nomor+'@s.whatsapp.net', org, text)   
reply('done..')
break
			    case 'setpp':
				lindow.updatePresence(from, Presence.composing) 
				if (!isQuotedImage) return reply(`Kirim gambar dengan caption ${prefix}setpp atau tag gambar yang sudah dikirim`)
					enmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lindow.downloadAndSaveMediaMessage(enmedia)
					await lindow.updateProfilePicture(botNumber, media)
					reply('Done!')
					break			
				case 'add':
					if (args.length < 1) return reply('Manaaa nomornyaa pea')
					if (args[0].startsWith('08')) return reply('Gunakan kode negara\n\nEx : 6289513946766')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						lindow.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('Gagal menambahkan, mungkin karena di private')
					}
					break
					case 'grup':
					case 'group':
					crgrup = '*_GROUP - SETTING_*'
					if (args[0] === 'unlock') {
					    costum(`Berhasil mebuka group`, text, tescuk, crgrup)
						lindow.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'lock') {
						costum(`Berhasil menutup group`, text, tescuk, crgrup)
						lindow.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
					break
                    
            case 'me':
            case 'sendcontact':
            case 'creator':
                  me = lindow.user
				  teks = `*Name :* ${me.name}\n\n*Number :* wa.me/6289513946766\n\n*Bio WhatsApp :* Lost soul\n\n*My age :* 14y.o\n\n*Total block contact :* ${blocked.length}`
				  lindow.sendMessage(from, {displayname: "Jeff", vcard: vcard}, MessageType.contact, { quoted: lin})
				  pepek = await getBuffer(me.imgUrl)
				  lindow.sendMessage(from, pepek, image, {quoted: lin, caption: teks})
           break    
           case 'demote':
					if (lin.message.extendedTextMessage === undefined || lin.message.extendedTextMessage === null) return reply('Tag target yg ingin di kudeta!')
					mentioned = lin.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `Done!\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						lindow.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(`Done! @${mentioned[0].split('@')[0]} sekarang menjadi member!`, mentioned, true)
						lindow.groupDemoteAdmin(from, mentioned)
					}
					break
				case 'promote':
					if (lin.message.extendedTextMessage === undefined || lin.message.extendedTextMessage === null) return reply('Tag dulu membernya njir')
					mentioned = lin.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `Done :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						lindow.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`Done! @${mentioned[0].split('@')[0]} sekarang admin`, mentioned, true)
						lindow.groupMakeAdmin(from, mentioned)
					}
					break
                    case 'getbio':
                    reply('premium, contact me via WhatsApp')
                     break
                    case 'cgc':
                   var kls = body.slice(5)
			       var has = kls.split("|")[0];
			       var kas = kls.split("|")[1];
			       var ka2 = kls.split("|")[2];
			        lindow.groupCreate(`${has}`, ["13092046444@s.whatsapp.net",`${kas}@s.whatsapp.net`,`${ka2}@s.whatsapp.net`])
						break
			     	case 'kick':
					if (lin.message.extendedTextMessage === undefined || lin.message.extendedTextMessage === null) return reply('Tag yang member yang ingin ditendang!')
					mentioned = lin.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `Otw.... :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						lindow.groupRemove(from, mentioned)
					} else {
						mentions(`Done! @${mentioned[0].split('@')[0]} akan di kick`, mentioned, true)
						lindow.groupRemove(from, mentioned)
					}
					break
				case 'listadmin':
					teks = `List admin group *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
				case 'toimg':
				    lindow.updatePresence(from, Presence.composing)
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lindow.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Gagal, pada saat mengkonversi sticker ke gambar')
						buf = fs.readFileSync(ran)
						lindow.sendMessage(from, buf, image, {quoted: lin, caption: '>//<'})
						fs.unlinkSync(ran)
					})
					break
                case 'wiki':
                    crwik = '*_WIKIPEDIA - SEARCH_*'
                    crq = '*_WIKIPEDIA_*'
                    costum('Searching data...', text, tescuk, crq)
					if (args.length < 1) return reply('masukan kata kunci')
					tels = body.slice(6)	
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/wiki?q=${tels}&apikey=BotWeA`, {method: 'get'})
					await costum(anu.result, text, tescuk, crwik)
					break
				case 'welcome':
					if (args.length < 1) return reply('Use 1 or 0\n\nEx :\n${prefix}welcome 1')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('Status : aktif')
						welkom.push(from)
						fs.writeFileSync('./src/group/welkom.json', JSON.stringify(welkom))
						reply('Succes, Mengaktifkan fitur welcome/left di group ini')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./src/group/welkom.json', JSON.stringify(welkom))
						reply('Succes, Menonaktifkan fitur welcome/left di group ini')
					} else {
						reply(`${prefix}welcome 1 untuk mengaktifkan\n${prefix}welcome 0 untuk menonaktifkan\ncontoh: ${prefix}welcome 1`)
					}
					break
			case 'tagall2':
					members_id = []
					teks = (args.length > 1) ? body.slice(9).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `╠➥ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					reply(teks)
					break
                 case 'tagall3':
					members_id = []
					teks = (args.length > 1) ? body.slice(9).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `╠➥ https://wa.me/${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					lindow.sendMessage(from, teks, text, {detectLinks: false, quoted: lin})
					break
				case 'clone':
					if (args.length < 1) return reply('tag target!!')
					if (lin.message.extendedTextMessage === undefined || lin.message.extendedTextMessage === null) return reply('Tag cvk')
					mentioned = lin.message.extendedTextMessage.contextInfo.mentionedJid[0]
					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
					try {
						pp = await lindow.getProfilePicture(id)
						buffer = await getBuffer(pp)
						lindow.updateProfilePicture(botNumber, buffer)
						mentions(`Foto profile Berhasil di perbarui menggunakan foto profile @${id.split('@')[0]}`, [jid], true)
					} catch (e) {
						reply('Gagal, ulangi lagi')
					}
					break
                case 'otakudesusearch':
                    var queryy = body.slice(17)
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/otakudesusearch?apikey=${Lolkey}&query=${queryy}`)
                    var get_result = get_result.result
                    txt = `Title : ${get_result.title}\n`
                    txt += `Japanese : ${get_result.japanese}\n`
                    txt += `Judul : ${get_result.judul}\n`
                    txt += `Type : ${get_result.type}\n`
                    txt += `Episode : ${get_result.episodes}\n`
                    txt += `Aired : ${get_result.aired}\n`
                    txt += `Producers : ${get_result.producers}\n`
                    txt += `Genre : ${get_result.genres}\n`
                    txt += `Duration : ${get_result.duration}\n`
                    txt += `Studios : ${get_result.status}\n`
                    txt += `Rating : ${get_result.rating}\n`
                    txt += `Credit : ${get_result.credit}\n`
                    var get_link = get_result.link_dl
                    for (var x in get_link) {
                        txt += `\n\n*${get_link[x].title}*\n`
                        for (var y in get_link[x].link_dl) {
                            var info = get_link[x].link_dl[y]
                            txt += `\n\`\`\`Reso : \`\`\`${info.reso}\n`
                            txt += `\`\`\`Size : \`\`\`${info.size}\n`
                            txt += `\`\`\`Link : \`\`\`\n`
                            var down_link = info.link_dl
                            for (var z in down_link) {
                                txt += `${z} - ${down_link[z]}\n`
                            }
                        }
                    }
                    reply(txt)
                    break
				case 'whatanime':
					if ((isMedia && !lin.message.videoMessage || isQuotedImage) && args.length == 0) {
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(lin).replace('quotedM','m')).message.extendedTextMessage.contextInfo : lin
						media = await lindow.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
							lindow.sendMessage(from, res.video, video, {quoted: lin, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
						})
					} else {
						reply(`Kirim foto lalu reply ${prefix}whatanime`)
					}
					break
		default:
	        if (body.startsWith(`${prefix}${command}`)) {
                  reply(`Command not found`)
               }
               } 
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
})
