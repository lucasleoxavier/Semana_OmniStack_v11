const crypto = require('crypto');
const connection = require('../database/connection');

const GenerateUniqueId = require ('../utils/GenerateUniqueId');

module.exports = {
    async create(request,response){
        const { name, email, city, uf, whatsapp } = request.body;

        const id = GenerateUniqueId();
    
        await connection('ongs').insert({
            id,
            name,
            email,
            city,
            uf,
            whatsapp
        });
    
        return response.json({ id });
    },
    async index(request, response){
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    }
}