import yts from 'yt-search'
import ytdl from 'ytdl-core';
import { ytDownload } from '../lib/y2mate.js';

let handler = async (m, { text, conn, args, usedPrefix, command }) => {
	if (!args[0]) return conn.reply(m.chat, `${lenguajeGB['smsAvisoMG']()}${mid.smsMalused7}\n*${usedPrefix + command} https://youtu.be/c5gJRzCi0f0*`, fkontak, m);

	let youtubeLink = '';

	if (args[0].includes('you')) {
		youtubeLink = args[0]; 
	} else {
		const index = parseInt(args[0]) - 1;

		if (index >= 0) {
			if (Array.isArray(global.videoList) && global.videoList.length > 0) {
				const matchingItem = global.videoList.find(item => item.from === m.sender);
				if (matchingItem) {
					if (index < matchingItem.urls.length) {
						youtubeLink = matchingItem.urls[index];
					} else {
						throw `${lenguajeGB['smsAvisoFG']()}${mid.smsYT} ${matchingItem.urls.length}*`;
					}} else {
						throw `${lenguajeGB['smsAvisoMG']()} ${mid.smsY2(usedPrefix, command)} ${usedPrefix}playlist <texto>*`;
					}} else {
						throw `${lenguajeGB['smsAvisoMG']()}${mid.smsY2(usedPrefix, command)} ${usedPrefix}playlist <texto>*`;
					}
				}
			};

			await conn.reply(m.chat, lenguajeGB['smsAvisoEG']() + mid.smsAud, fkontak, m)

			try {
				let v = youtubeLink;
				const dataRE = await fetch(`https://www.vanitas-api.online/download/ytmp3?url=${v}`);
				const dataRET = await dataRE.json();

				await conn.sendMessage(m.chat, dataRET.response.link, 'default.mp3', null, m, false, { mimetype: 'audio/mpeg' });
			} catch(e) {
				try {
					let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${lolkeysapi}&url=${youtubeLink}`)    
					let lolh = await lolhuman.json()
					let n = lolh.result.title || 'error'
					await conn.sendMessage(m.chat, { audio: { url: lolh.result.link }, fileName: `${n}.mp3`, mimetype: 'audio/mp4' }, { quoted: m })  
				} catch {   
					try {
						let searchh = await yts(youtubeLink)
						let __res = searchh.all.map(v => v).filter(v => v.type == "video")
						let infoo = await ytdl.getInfo('https://youtu.be/' + __res[0].videoId)
						let ress = await ytdl.chooseFormat(infoo.formats, { filter: 'audioonly' })
						conn.sendMessage(m.chat, { audio: { url: ress.url }, fileName: __res[0].title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })  
					} catch (e) {
						await conn.reply(m.chat, `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`, fkontak, m)
						console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
						console.log(e)}
					}
				};
			};

handler.command = /^audio|fgmp3|dlmp3|getaud|yt(a|mp3)$/i
export default handler
