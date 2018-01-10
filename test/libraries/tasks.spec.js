/* global describe it beforeEach */

/***********************
 * Module Dependencies *
 ***********************/
const chai = require('chai'),
  { expect } = chai,
  lib = require('../../app/libraries/tasks'),
  CONSTS = require('../../app/consts/task');


describe('libraries/tasks', () => {
  describe('validateTask()', () => {
    let task;
    beforeEach(() => {
      task = {
        description: 'Buy groceries and pay rent.',
        priority: 'a',
        status: 'incomplete'
      };
    });

    it('should return empty string for a valid task', () => {
      expect(lib.validateTask(task)).to.equal('');
    });

    it('should work for tasks with valid priorities', () => {
      expect(lib.validateTask(task)).to.equal('');
      task.priority = 'b';
      expect(lib.validateTask(task)).to.equal('');
      task.priority = 'c';
      expect(lib.validateTask(task)).to.equal('');
    });

    it('should work for tasks with valid statuses', () => {
      expect(lib.validateTask(task)).to.equal('');
      task.status = 'in progress';
      expect(lib.validateTask(task)).to.equal('');
      task.status = 'completed';
      expect(lib.validateTask(task)).to.equal('');
      task.status = 'forwarded';
      expect(lib.validateTask(task)).to.equal('');
    });

    it('should return an appropriate error message if description is missing or empty', () => {
      task.description = undefined;
      expect(lib.validateTask(task)).to.equal(CONSTS.ERRORS.DESCRIPTION);
      task.description = '';
      expect(lib.validateTask(task)).to.equal(CONSTS.ERRORS.DESCRIPTION);
    });

    it('should return an appropriate error message if status is missing or invalid', () => {
      task.status = undefined;
      expect(lib.validateTask(task)).to.equal(CONSTS.ERRORS.STATUS);
      task.status = 'hosed';
      expect(lib.validateTask(task)).to.equal(CONSTS.ERRORS.STATUS);
    });

    it('should return an appropriate error message if priority is missing or invalid', () => {
      task.priority = undefined;
      expect(lib.validateTask(task)).to.equal(CONSTS.ERRORS.PRIORITY);
      task.priority = 'd';
      expect(lib.validateTask(task)).to.equal(CONSTS.ERRORS.PRIORITY);
    });

    it('should return a full error message if description, status or priority are missing or invalid', () => {
      const error = `${CONSTS.ERRORS.DESCRIPTION} ${CONSTS.ERRORS.PRIORITY} ${CONSTS.ERRORS.STATUS}`;

      task.description = undefined;
      task.status = undefined;
      task.priority = undefined;
      expect(lib.validateTask(task)).to.equal(error);

      task.description = '';
      task.status = 'hosed';
      task.priority = 'd';
      expect(lib.validateTask(task)).to.equal(error);
    });
  });
});
