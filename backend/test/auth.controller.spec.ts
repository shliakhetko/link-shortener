import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
    let app: INestApplication;
    let accessToken: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/POST auth/login', async () => {
        const response = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ username: 'danylo', password: 'Pasword123!' })
            .expect(201);

        accessToken = response.body.access_token;
        expect(accessToken).toBeDefined();
    });

    it('/POST auth/profile', async () => {
        return request(app.getHttpServer())
            .post('/auth/profile')
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(201)
            .expect((res) => {
                expect(res.body).toHaveProperty('userId');
                expect(res.body).toHaveProperty('username', 'danylo');
            });
    });

    afterAll(async () => {
        await app.close();
    });
});