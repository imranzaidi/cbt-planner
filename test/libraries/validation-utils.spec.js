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

    it('should work for ["a", "b"]', () => {
      const options = ['a', 'b'];
      expect(lib.optionsToString(options)).to.equal('\'a\' or \'b\'');
    });


    it('should work for a single value array', () => {
      const options = ['whatever'];
      expect(lib.optionsToString(options)).to.equal('\'whatever\'');
    });

    it('should return empty string for []', () => {
      const options = [];
      expect(lib.optionsToString(options)).to.equal('');
    });
  });
});
