import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

jest.mock('nanoid', () => {
    return {
        nanoid: jest.fn().mockReturnValue('exmpl'),
    };
});

describe('LinkController (e2e)', () => {
    let app: INestApplication;
    let jwtService: JwtService;
    let jwtToken: string;
    let createdLinkId: string;
    let shortLink: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        jwtService = moduleFixture.get<JwtService>(JwtService);
        jwtToken = jwtService.sign({ userId: 'test-user-id' }); // Generate a valid JWT token
        await app.init();
    });

    it('/POST link', async () => {
        const response = await request(app.getHttpServer())
            .post('/link')
            .set('Authorization', `Bearer ${jwtToken}`)
            .send({ link: 'https://google.com' })
            .expect(201);

        createdLinkId = response.body._id;
        shortLink = response.body.shortLink;
        expect(createdLinkId).toBeDefined();
        expect(response.body).toHaveProperty('link', 'https://google.com');
        expect(response.body).toHaveProperty('shortLink');
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
            .get(`/link/id/${createdLinkId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body).toHaveProperty('link', 'https://google.com');
                expect(res.body).toHaveProperty('shortLink', 'exmpl');
            });
    });

    it('/GET redirect/:shortLink', async () => {
        const redirectResponse = await request(app.getHttpServer())
            .get(`/${shortLink}`)
            .expect(302);

        expect(redirectResponse.header.location).toBe('https://google.com');
    });

    it('/PATCH link/:id', () => {
        expect(createdLinkId).toBeDefined();
        return request(app.getHttpServer())
            .patch(`/link/${createdLinkId}`)
            .set('Authorization', `Bearer ${jwtToken}`)
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
            .set('Authorization', `Bearer ${jwtToken}`)
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});