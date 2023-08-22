const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const moment = require('moment-timezone');

describe('POST /process', function() {
  it('should return Discord tag for "3pm"', async function() {
    const text = '3pm';
    const timezone = 'America/New_York';
    const expectedUnix = moment.tz(text, 'h a', timezone).unix();
    const res = await request(app).post('/process').send({ timezone, text });
    expect(res.body.result).to.include(`<t:${expectedUnix}>`);
  });

  it('should return Discord tag for "3 PM"', async function() {
    const text = '3 PM';
    const timezone = 'America/New_York';
    const expectedUnix = moment.tz(text, 'h A', timezone).unix();
    const res = await request(app).post('/process').send({ timezone, text });
    expect(res.body.result).to.include(`<t:${expectedUnix}>`);
  });

  it('should return Discord tag for "tomorrow at 1 pm"', async function() {
    const text = 'tomorrow at 1 pm';
    const timezone = 'America/New_York';
    const expectedUnix = moment.tz(text, 'ddd h a', timezone).add(1, 'days').unix();
    const res = await request(app).post('/process').send({ timezone, text });
    expect(res.body.result).to.include(`<t:${expectedUnix}>`);
  });

  it('should return Discord tag for "August 3 at 1:34pm"', async function() {
    const text = 'August 3 at 1:34pm';
    const timezone = 'America/New_York';
    const expectedUnix = moment.tz(text, 'MMM D h:mm a', timezone).unix();
    const res = await request(app).post('/process').send({ timezone, text });
    expect(res.body.result).to.include(`<t:${expectedUnix}>`);
  });

  it('should return Discord tag for "Tuesday 15:33"', async function() {
    const text = 'Tuesday 15:33';
    const timezone = 'America/New_York';
    const expectedUnix = moment.tz(text, 'dddd HH:mm', timezone).unix();
    const res = await request(app).post('/process').send({ timezone, text });
    expect(res.body.result).to.include(`<t:${expectedUnix}>`);
  });
});
