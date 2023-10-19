const request = require("supertest")
const app = require("../app")
const { User } = require("../models")
const { Photo } = require("../models")

const dataUser = {
    usernamme: "admin",
    email: "admin@gmail.com",
    password: "terlanjuradmin"
}

const dataPhoto = {
    title: "Test create",
    caption: "caption",
    image_url: "google.com"
}

// nomer 1
describe("POST /photos", () => { 
    let token
    beforeAll(async () => {
        try {
            await User.create(dataUser)
            const login = await request(app)
            .post("/users/login")
            .send({
                email: dataUser.email,
                password: dataUser.password
            });

            token = login.body.token
        } catch (error) {
            console.log(error);
        }
    })
    
    it("No1 Res 401", (done) => {
        request(app)
        .post("/photos")
        .send({
            title: dataPhoto.title,
            caption: dataPhoto.caption,
            image_url: dataPhoto.image_url
        })
        .expect(401)
        .end((err, res) => {
            if(err) done(err)

            expect(res.body).toHaveProperty("message")
            expect(res.body.message).toEqual("Token not provided!")
            done()
        })
    })

    it("No1 Res 201", (done) => {
        request(app)
        .post("/photos")
        .set('authorization', token)
        .send({
            title: dataPhoto.title,
            caption: dataPhoto.caption,
            image_url: dataPhoto.image_url
        })
        .expect(201)
        .end((err, res,) => {
            if(err) done(err)
    
            expect(res.body).toHaveProperty("title")
            expect(res.body.message).toEqual("Token not provided!")
            done()
        })
    })

    afterAll(async () => {
        try {
            await Photo.destroy({ where: {}})
            await User.destroy({ where: {}})
        } catch (error) {
            console.log(error);
        }
    })
})

// nomer 2
describe("POST /photos", () => { 
    let token
    beforeAll(async () => {
        try {
            await User.create(dataUser)
            const login = await request(app)
            .post("/users/login")
            .send({
                email: dataUser.email,
                password: dataUser.password
            });
            token = login.body.token
            const phoyo = await request(app)
            .post("/photos")
            .set('authorization', token)
            .send({
                title: dataPhoto.title,
                caption: dataPhoto.caption,
                image_url: dataPhoto.image_url
            })
            // console.log(test_title, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        } catch (error) {
            console.log(error);
        }
    })

    it("No2 Res 401", (done) => {
        request(app)
        .get("/photos")
        .expect(401)
        .end((err, res,) => {
        if(err) done(err)

        expect(res.body).toHaveProperty("message")
        expect(res.body.message).toEqual("Token not provided!")
        done()
        })
    })

    it("No2 Res 200", (done) => {
        request(app)
        .get("/photos")
        .set('authorization', token)
        .expect(200)
        .end((err, res,) => {
            if(err) done(err)

            expect(res.body).toBeInstanceOf(Array);
            res.body.forEach(photo => {
                expect(photo).toHaveProperty("title");
            });
            done()
        })
    })

    afterAll(async () => {
        try {
            await Photo.destroy({ where: {}})
            await User.destroy({ where: {}})
        } catch (error) {
            console.log(error);
        }
    })
})

// nomer 3
describe("POST /photos", () => { 
    let token
    let testId
    beforeAll(async () => {
        try {
            await User.create(dataUser)
            const login = await request(app)
            .post("/users/login")
            .send({
                email: dataUser.email,
                password: dataUser.password
            });
            token = login.body.token
            const phoyo = await request(app)
            .post("/photos")
            .set('authorization', token)
            .send({
                title: dataPhoto.title,
                caption: dataPhoto.caption,
                image_url: dataPhoto.image_url
            })
            testId = phoyo.body.id
        } catch (error) {
            console.log(error);
        }
    })

    it("No3 Res 401", (done) => {
        request(app)
        .get(`/photos/${testId}`)
        .expect(401)
        .end((err, res,) => {
            if(err) done(err)
    
            expect(res.body).toHaveProperty("message")
            expect(res.body.message).toEqual("Token not provided!")
            done()
        })
        })
    
    it("No3 Res 200", (done) => {
        request(app)
        .get(`/photos/${testId}`)
        .set('authorization', token)
        .expect(200)
        .end((err, res,) => {
            if(err) done(err)
    
            expect(res.body).toHaveProperty("title")
            // expect(res.body.message).toEqual()
            done()
        })
    })

        afterAll(async () => {
        try {
            await Photo.destroy({ where: {}})
            await User.destroy({ where: {}})
        } catch (error) {
            console.log(error);
        }
        })
    })