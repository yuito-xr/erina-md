const {erina}=require("../framework/erina")







erina({nomCom:"reboot",categorie:"Mods",reaction:"🗿"},async(dest,z,com)=>{


  
const{repondre,ms,dev,superUser}=com;

  if(!superUser)
  {
    return repondre("This command is for *Erina-Md* owner only");
  }

  const {exec}=require("child_process")

    repondre("*restarting ...*");

  exec("pm2 restart all");
  

  



})
