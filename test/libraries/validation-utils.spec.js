/* global describe it */

/***********************
 * Module Dependencies *
 ***********************/
const chai = require('chai'),
  { expect } = chai,
  lib = require('../../app/libraries/validation-utils');


describe('libraries/validation-utils', () => {
  describe('optionsToString()', () => {
    it('should work for ["yes", "no", "maybe"]', () => {
      const options = ['yes', 'no', 'maybe'];
      expect(lib.optionsToString(options)).to.equal('\'yes\', \'no\' or \'maybe\'');
    });

    it('should work for ["a", "b", "c"]', () => {
      const options = ['a', 'b', 'c'];
      expect(lib.optionsToString(options)).to.equal('\'a\', \'b\' or \'c\'');
    });

    it('should work for ["a", "b"]', () => {
      const options = ['a', 'b'];
      expect(lib.optionsToString(options)).to.equal('\'a\' or \'b\'');
    });

    it('should return empty string for []', () => {
      const options = [];
      expect(lib.optionsToString(options)).to.equal('');
    });
  });
});
