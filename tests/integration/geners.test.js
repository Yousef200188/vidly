const request = require('supertest')
const { Gener } = require('../../route/models/gener')
const { User } = require('../../route/models/user')
const express = require('express')
const { dotenvConfig } = require('custom-env')
const app = express()
let server


describe('/api/geners', () => {
    beforeEach(() => { server = require('../../index')

})
afterEach(async()=>{
    
    await Gener.remove({})
})
  
        it('should return all geners', async () => {
            await Gener.collection.insertMany([
                { name: 'gener1' },
                { name: 'gener2' }
            ])
            const res = await request(server).get('/api/generes')
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(2)
            expect(res.body.some(g => g.name === 'gener1')).toBeTruthy()
            
        
    });

    describe('GET/:ID', () => {
        it('GET/id', async () => {
            const res = await request(server).get('/api/generes/6')
            expect(res.status).toBe(404)
        });
    });
    describe('Post', () => {
        let token;
        let name
        const exec = async () => {
            return await request(server)
                .post('/api/generes')
                .set('x-auth-token', token)
                .send({ name })
        }
        beforeEach(() => {
            token = new User().generateAuthToken()
            name = 'gener1'
        })
        it('should return 401 if the client not logged in', async () => {
            token = ''
            const res = await exec()
            expect(res.status).toBe(401)
        })
        it('should return 400 if the gener less than 5 characters', async () => {
            name = '123'
            const res = await exec()

            expect(res.status).toBe(401)

        })
        it('should return 401 if the gener more than 50 characters', async () => {
            name = new Array(55).join('a')
            const res = await exec()
            expect(res.status).toBe(401)

        })
        it('should save the gener if it is valid', async () => {
            const gener = await Gener.find({ name: 'gener1' })
            const res = await exec()
            expect(gener).not.toBeNull()


        });
        it('should return the gener if it is valid', async () => {
            const gener = await Gener.find({ name: 'gener1' })
            const res = await exec()
            expect(res.body).toHaveProperty('_id')
            expect(res.body).toHaveProperty('name', 'gener1')

        })

    })
})


