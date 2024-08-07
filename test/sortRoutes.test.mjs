import { expect } from 'chai';
import supertest from 'supertest';
import { app } from '../server.mjs';

const request = supertest(app);

describe('POST /format', () => {
    const languages = {
        'python': `sorted_data = [
  "h",
  "g",
  "f",
  "e",
  "d",
  "c",
  "b",
  "a"
]`,
        'javascript': `const sortedData = [
  "h",
  "g",
  "f",
  "e",
  "d",
  "c",
  "b",
  "a"
];`,
        'java': `List<String> sortedData = Arrays.asList("h", "g", "f", "e", "d", "c", "b", "a");`,
        'csharp': `List<string> sortedData = new List<string> { "h", "g", "f", "e", "d", "c", "b", "a" };`,
        'php': `$sortedData = array("h", "g", "f", "e", "d", "c", "b", "a");`,
        'typescript': `const sortedData: string[] = [
  "h",
  "g",
  "f",
  "e",
  "d",
  "c",
  "b",
  "a"
];`,
        'swift': `let sortedData = ["h", "g", "f", "e", "d", "c", "b", "a"]`,
        'ruby': `sorted_data = ["h", "g", "f", "e", "d", "c", "b", "a"]`,
        'cplusplus': `std::vector<std::string> sortedData = { "h", "g", "f", "e", "d", "c", "b", "a" };`,
        'go': `sortedData := []string{"h", "g", "f", "e", "d", "c", "b", "a"}`,
        'rust': `let sorted_data = vec!["h", "g", "f", "e", "d", "c", "b", "a"];`,
        'kotlin': `val sortedData = listOf("h", "g", "f", "e", "d", "c", "b", "a");`,
        'dart': `List<String> sortedData = ["h", "g", "f", "e", "d", "c", "b", "a"];`,
        'objectivec': `NSArray *sortedData = @[@"h", "g", "f", "e", "d", "c", "b", "a"];`,
        'scala': `val sortedData = List("h", "g", "f", "e", "d", "c", "b", "a");`,
        'perl': `my @sortedData = ("h", "g", "f", "e", "d", "c", "b", "a");`,
        'lua': `sorted_data = {"h", "g", "f", "e", "d", "c", "b", "a"}`,
        'haskell': `sortedData = ["h", "g", "f", "e", "d", "c", "b", "a"]`,
        'julia': `sorted_data = ["h", "g", "f", "e", "d", "c", "b", "a"]`,
        'elixir': `sorted_data = ["h", "g", "f", "e", "d", "c", "b", "a"]`
    };

    Object.entries(languages).forEach(([language, expectedOutput]) => {
        it(`should return formatted data in ${language}`, async () => {
            const response = await request.post('/format').send({
                data: ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'],
                format: 'json',
                language
            });

            expect(response.status).to.equal(200);
            expect(response.text).to.include(`// Code in ${language}:\n${expectedOutput}`);
        });
    });

    it('should return error for unsupported format', async () => {
        const response = await request.post('/format').send({
            data: ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'],
            format: 'unsupported_format'
        });

        expect(response.status).to.equal(400);
    });
});
