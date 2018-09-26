/***********************
 * Module Dependencies *
 ***********************/
const lib = require('../../app/libraries/dateUtilities');


describe('Date Utilities library', () => {
  it('should validate dates that are Mondays', () => {
    const Sep24th2018 = new Date('09-24-2018');
    const August27th2018 = new Date('08-27-2018');
    const July2nd2018 = new Date('07-02-2018');
    const notAMonday = new Date('07-03-2018');
    const alsoNotAMonday = new Date('08-25-2018');
    const againNotAMonday = new Date('09-28-2018');

    expect(lib.isBeginningOfWeek(Sep24th2018)).toBe(true);
    expect(lib.isBeginningOfWeek(August27th2018)).toBe(true);
    expect(lib.isBeginningOfWeek(July2nd2018)).toBe(true);
    expect(lib.isBeginningOfWeek(notAMonday)).toBe(false);
    expect(lib.isBeginningOfWeek(alsoNotAMonday)).toBe(false);
    expect(lib.isBeginningOfWeek(againNotAMonday)).toBe(false);
  });

  it('should validate dates that are beginning of the Month', () => {
    const Sep1st2018 = new Date('09-01-2018');
    const August1st2018 = new Date('08-01-2018');
    const July1st2018 = new Date('07-01-2018');
    const notTheFirst = new Date('07-03-2018');
    const alsoNotTheFirst = new Date('08-25-2018');
    const againNotTheFirst = new Date('09-28-2018');

    expect(lib.isBeginningOfMonth(Sep1st2018)).toBe(true);
    expect(lib.isBeginningOfMonth(August1st2018)).toBe(true);
    expect(lib.isBeginningOfMonth(July1st2018)).toBe(true);
    expect(lib.isBeginningOfMonth(notTheFirst)).toBe(false);
    expect(lib.isBeginningOfMonth(alsoNotTheFirst)).toBe(false);
    expect(lib.isBeginningOfMonth(againNotTheFirst)).toBe(false);
  });

  it('should throw an error for invalid types i.e. not a date', () => {
    const Sep25th2018 = '09-24-2018';
    const expectedError = 'Argument date needs to be fo type Date!';

    expect(() => {
      lib.isBeginningOfWeek(Sep25th2018);
    }).toThrow(expectedError);

    expect(() => {
      lib.isBeginningOfMonth(Sep25th2018);
    }).toThrow(expectedError);

  });
});
