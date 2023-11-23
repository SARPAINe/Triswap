/* eslint-disable @typescript-eslint/no-explicit-any */
import supertest from 'supertest'
import app from '../app'
import { startServer, closeServer, setupDB, closeDB } from '../server'
import { adminUserPayload, userPayload } from './test-data'

let server: any
let adminToken: string
let userToken: string

beforeAll(async () => {
  await setupDB()
  server = await startServer()
  const { body } = await supertest(app)
    .post(`/api/v1/auth/register`)
    .send(adminUserPayload)
  adminToken = body.data.token
})

afterAll(async () => {
  await closeDB()
  await closeServer(server)
})

describe('Register user', () => {
  it('should return CREATED 201', async () => {
    const { body, statusCode } = await supertest(app)
      .post(`/api/v1/auth/register`)
      .send(userPayload)

    userToken = body.data.token

    expect(statusCode).toBe(201)
    expect(body.data.user.username).toBe(userPayload.username)
    expect(body.data.user.email).toBe(userPayload.email)
  })

  it('should return SequelizeUniqueConstraintError 500', async () => {
    const { body, statusCode } = await supertest(app)
      .post(`/api/v1/auth/register`)
      .send(userPayload)
    expect(statusCode).toBe(500)
    expect(body.error.error).toBe('SequelizeUniqueConstraintError')
  })
})

describe('Login user', () => {
  const loginPayload = {
    email: 'user@email.com',
    password: 'userpw',
  }
  it('Should successfully log in', async () => {
    const { statusCode } = await supertest(app)
      .post(`/api/v1/auth/login`)
      .send(loginPayload)
    expect(statusCode).toBe(200)
  })

  it('Should NOT successfully log in 401', async () => {
    const loginPayload = {
      email: 'user@email.com',
      password: '__userpw',
    }
    const { body, statusCode } = await supertest(app)
      .post(`/api/v1/auth/login`)
      .send(loginPayload)
    expect(statusCode).toBe(401)
    expect(body.error.error).toBe('UnauthenticatedError')
  })
})

describe('User permission', () => {
  it('should return unauthenticated 401', async () => {
    const userId = 1
    await supertest(app).get(`/api/v1/auth/user/${userId}`).expect(401)
  })

  it('should return unauthorized 403', async () => {
    const userId = 1
    await supertest(app)
      .get(`/api/v1/auth/user/${userId}`)
      .set('Authorization', `${userToken}`)
      .expect(403)
  })

  it('should return OK 200', async () => {
    const userId = 2
    const { body, statusCode } = await supertest(app)
      .get(`/api/v1/auth/user/${userId}`)
      .set('Authorization', `${adminToken}`)
    expect(statusCode).toBe(200)
    expect(body.data.user.username).toBe(userPayload.username)
    expect(body.data.user.email).toBe(userPayload.email)
  })

  it('should return not found 404', async () => {
    const userId = 123
    await supertest(app)
      .get(`/api/v1/auth/user/${userId}`)
      .set('Authorization', `${adminToken}`)
      .expect(404)
  })
})
