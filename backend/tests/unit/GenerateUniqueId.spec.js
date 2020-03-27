const GenerateUniqueId = require('../../src/utils/GenerateUniqueId');

describe('Generate Unique ID', () => {
    it('should generate an unique id', () => {
        const id = GenerateUniqueId();
        expect(id).toHaveLength(8);
    });
});