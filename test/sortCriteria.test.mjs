import { expect } from 'chai';
import sortCriteria from '../sortCriteria.mjs';

describe('sortCriteria', () => {
    it('should sort alphabetically', () => {
        const result = ['b', 'a', 'c'].sort(sortCriteria.alphabetical);
        expect(result).to.deep.equal(['a', 'b', 'c']);
    });

    it('should sort by length', () => {
        const result = ['abc', 'a', 'ab'].sort(sortCriteria.length);
        expect(result).to.deep.equal(['a', 'ab', 'abc']);
    });

    // Add more tests for other criteria
});
