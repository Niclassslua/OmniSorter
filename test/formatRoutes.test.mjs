import { expect } from 'chai';
import supertest from 'supertest';
import { app } from '../server.mjs';

const request = supertest(app);

describe('POST /format', () => {
    it('should return formatted data in JSON format', async () => {
        const response = await request.post('/format').send({
            data: ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'],
            format: 'json',
            language: 'javascript'
        });

        expect(response.status).to.equal(200);
        expect(response.text).to.include('const sortedData');
    });

    it('should return error for unsupported format', async () => {
        const response = await request.post('/format').send({
            data: ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'],
            format: 'unsupported_format'
        });

        expect(response.status).to.equal(400);
    });
});
