const bcrypt = require('bcrypt')
async function run(){
    const salt = await bcrypt.genSalt(10)
    console.log(salt)
}
console.log( bcrypt.compareSync('301050827014955','$2b$10$skE4tcDrjGojuTNAXUDn.u/uXC8gZzs2GFqb/NWXsAJorTSF/GAjm'))