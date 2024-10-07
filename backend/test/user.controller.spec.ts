import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
    let app: INestApplication;
    let createdUserId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/POST user', async () => {
        const response = await request(app.getHttpServer())
            .post('/user')
            .send({ username: 'testuser', email: 'test@example.com', password: 'Password123!' })
            .expect(201);

        createdUserId = response.body._id;
        expect(createdUserId).toBeDefined();
        expect(response.body).toHaveProperty('username', 'testuser');
        expect(response.body).toHaveProperty('email', 'test@example.com');
    });

    it('/GET users', () => {
        return request(app.getHttpServer())
            .get('/user')
            .expect(200)
            .expect((res) => {
                expect(res.body).toBeInstanceOf(Array);
            });
    });

    it('/GET user/:id', () => {
        expect(createdUserId).toBeDefined();
        return request(app.getHttpServer())
            .get(`/user/${createdUserId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body).toHaveProperty('username', 'testuser');
                expect(res.body).toHaveProperty('email', 'test@example.com');
            });
    });

    it('/PATCH user/:id', () => {
        expect(createdUserId).toBeDefined();
        return request(app.getHttpServer())
            .patch(`/user/${createdUserId}`)
            .send({ username: 'updateduser', email: 'updated@example.com' })
            .expect(200)
            .expect((res) => {
                expect(res.body).toHaveProperty('username', 'updateduser');
                expect(res.body).toHaveProperty('email', 'updated@example.com');
            });
    });

    it('/DELETE user/:id', () => {
        expect(createdUserId).toBeDefined();
        return request(app.getHttpServer())
            .delete(`/user/${createdUserId}`)
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});