/**
 * DefaultDataBootstrap.js
 * Populate DB with default value
 */
module.exports = function (done) {
  require('fs').readFile(__dirname + '/../bootstrap/default-data.json', function (err, data) {
    // exit if error in reading file
    if (err) {
      sails.log.error('Unable to read default-data.json. %s', err);
      return done();
    }

    // parse in try-block to avoid crash during parsing error
    try {
      // convert default-data file to JSON
      data = JSON.parse(data);
    } catch (e) {
      // when parsing error, exit
      sails.log.error('Unable to parse default-data.json. %s', e);
      return done();
    }

    //all ok, populate database

    done();
  });
};
