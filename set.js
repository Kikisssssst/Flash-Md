const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidVBHcmRqK3BkU0Z3Q2JtK0ltUnI0MTNrZUtldThiTExhQVErcDhzUEEwZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYS9tUkFKeTZiVUdiaFkxdnlWNnlZUzEzYWJsYlQ2dlFoaXQ1U0hVb2MzWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPSTVXeUJZZVc2aWtWWnNrVkszQjkvRURVc0J5UVlKd2s2Z2svTUdFZDNjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOTnNsU2VCQTNncVhnbEJncXY2Q3pVdkNNM3FMNEVnNVB0SG56MEt6YkU4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtMZDltWElQOUF5QlhNREhhbGp1YS9YaEVoVUp6cXo4VmJqaWxYNEpKM0k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFWNGtoK1gyQmNCbWkxVm85SnNYUXpyRnJXZWVQTkZERmRsS1BhZllPRm89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVU53eGFoOExzajZib1lKK3Urdkxlc0RYY2ZHTHIzUW8rcnFIajlrNElHMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTVBSMk5kZ2cwTXhIYnFKTlBPSTdQWmgwVU0zbnVmOGk4c1RYK3ZUQjZ6WT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImwrbnlXUnpSa29NZHZyVGFIcU5pTDV4NVFqbm04T0pyVWJHZ0pWL282aGJDZmlGRTBIRCtXVnBOSkhxZDNiRnNwUm8wYlRkK1NQZ1F0SkR0RldkT0JBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIxLCJhZHZTZWNyZXRLZXkiOiJGc0dOSTVnbjRwbktzdHVwUy9UQW9uKzJkUndaMk4yT1BFRXFUNnBXQlhFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjYyODU2NTU4MTQ4NjZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMTM0MzRFNTdFMjMyMjk2MEVBRDM4NjJGRDk1REY1NTMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcxMjAzNzgzNX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiSUVuM1lXLU1TLUt2OWVqZ3NrNDhDUSIsInBob25lSWQiOiIyN2E4Y2U5OS05NTFmLTRkYWUtYTI1Zi03YjhkNDBkNzg0NjQiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOTZ1LzJLeE0xRmhXOStPTDh6ejQxdzR0dUl3PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InR4OFdObVZKUUdCTHhMY0NXWmxzQXR2K095WT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJDMUxYTFRIMiIsIm1lIjp7ImlkIjoiNjI4NTY1NTgxNDg2NjoyOUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJSaWZreSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT2ZRcWIwSEVMMi9yckFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiaGVEaTUzSHRWaExodnNHR1NGZERkckVxc2tWWFN6eUgraW1pcEhlRzEwMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiMDVrZXJXOW9pZTBOOExZNmJQMEVTY21hL2lnc0NLYnNXMEtqRE40VjRFSlFlTHM5OUxTMXg5dDl2elZuUmwyK0VxZW5oSEt2RnB0Y05yWEVsUHVLQ3c9PSIsImRldmljZVNpZ25hdHVyZSI6InNGc0x1ZXBYOWhiZU9uOG1tbS9GUi9pcXAzYUM5OVY5bFkvRUxuRDByRVYyWk9FOU1FVlQrV2tKelJuR2ZYSmY0L2REenBJM3dxL3FUNTVyeGNpdkJnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNjI4NTY1NTgxNDg2NjoyOUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZWGc0dWR4N1ZZUzRiN0Joa2hYUTNheEtySkZWMHM4aC9vcG9xUjNodGROIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzEyMDM3ODMyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUx1eSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "6285655814866",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "oui",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
