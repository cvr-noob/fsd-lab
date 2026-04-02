const os = require('os');
const path = require('path');
const util = require('util');
const EventEmitter = require('events');
const fs = require('fs');

// os
console.log(os.platform());

// path
console.log(path.basename('/a/b/c.txt'));

// util
console.log(util.format('Hello %s', 'world'));

// events
const emitter = new EventEmitter();
emitter.on('ping', () => console.log('pong'));
emitter.emit('ping');

// file I/O

// write
fs.writeFile('test.txt', 'Hello File', (err) => {
  if (err) return console.error(err);

  // read
  fs.readFile('test.txt', 'utf8', (err, data) => {
    if (err) return console.error(err);
    console.log(data);

    // append
    fs.appendFile('test.txt', '\nAppended Line', (err) => {
      if (err) return console.error(err);

      // read again
      fs.readFile('test.txt', 'utf8', (err, data) => {
        if (err) return console.error(err);
        console.log(data);

        // delete
        fs.unlink('test.txt', (err) => {
          if (err) return console.error(err);
          console.log('File deleted');
        });
      });
    });
  });
});
