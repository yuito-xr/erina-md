const util = require('util');
const fs = require('fs-extra');
const { erina } = require(__dirname + "/../framework/erina");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

erina({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//erina");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
╭──────────────────────⟢
│ㅤ╭───────────────────⟢
│ㅤ│ *NEZUKO-MD*
│ㅤ│ *BOT-OWNER* : ${s.OWNER_NAME}
│ㅤ│ *Date* : ${date}
│ㅤ│ *PREFIX* : ${s.PREFIXE}
│ㅤ╰──────────────────⟢
╰──────────────────────⟢`;
    
let menuMsg = `
╭──────────────────────⟢
│ㅤ   *COMMAND LIST*
╰──────────────────────⟢
`;

    for (const cat in coms) {
        menuMsg += `╭────── *${cat}* ─────⟢`;
        for (const cmd of coms[cat]) {
            menuMsg += `
[⭐] ${cmd}`;
        }
        menuMsg += `
╰─────────────────────⟢ \n`
    }

    menuMsg += `
            
𝐂𝚪𝚵𝚫𝚻𝚵𝐃 𝚩𝐘 𝐘𝐔𝚰𝚻𝚯
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Nezuko-MD*, déveloper Yuito" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Nezuko-MD*, déveloper Yuito" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
