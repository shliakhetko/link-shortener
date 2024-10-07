import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('LinkController (e2e)', () => {
    let app: INestApplication;
    let createdLinkId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/POST link', async () => {
        const response = await request(app.getHttpServer())
            .post('/link')
            .send({ link: 'https://example.com', shortLink: 'exmpl' })
            .expect(201);

        createdLinkId = response.body._id;
        expect(createdLinkId).toBeDefined();
        expect(response.body).toHaveProperty('link', 'https://example.com');
        expect(response.body).toHaveProperty('shortLink', 'exmpl');
    });

    it('/GET links', () => {
        return request(app.getHttpServer())
            .get('/link')
            .expect(200)
            .expect((res) => {
                expect(res.body).toBeInstanceOf(Array);
            });
    });

    it('/GET link/:id', () => {
        expect(createdLinkId).toBeDefined();
        return request(app.getHttpServer())
            .get(`/link/${createdLinkId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body).toHaveProperty('link', 'https://example.com');
                expect(res.body).toHaveProperty('shortLink', 'exmpl');
            });
    });

    it('/PATCH link/:id', () => {
        expect(createdLinkId).toBeDefined();
        return request(app.getHttpServer())
            .patch(`/link/${createdLinkId}`)
            .send({ link: 'https://updated.com', shortLink: 'upd' })
            .expect(200)
            .expect((res) => {
                expect(res.body).toHaveProperty('link', 'https://updated.com');
                expect(res.body).toHaveProperty('shortLink', 'upd');
            });
    });

    it('/DELETE link/:id', () => {
        expect(createdLinkId).toBeDefined();
        return request(app.getHttpServer())
            .delete(`/link/${createdLinkId}`)
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});