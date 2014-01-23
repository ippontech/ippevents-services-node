'use strict';

var utilsMethods = require('./utils.js');

describe("Utils", function() {

  var helloWorld = function() {
    return "Hello world!";
  };

  beforeEach(function() {
    // player = new Player();
    // song = new Song();
  });

  describe('Hello world', function() {
    it('says hello', function() {
      expect(helloWorld()).toEqual("Hello world!");
    });
  });

  describe("when song has been paused", function() {
     beforeEach(function() {
       // player.play(song);
       // player.pause();
     });

     it("shouldn't have duplicated speackers in session", function() {

      var events = [];
      events.push({
            performances : [{
              title: 'Coding Dojo',
              format: '',
              timebox: 2,
              status: '',
              description: '',
              speakers: [{
                firstname: 'John',
                lastname: 'Doe',
                email: '',
                twitter: '',
                phone: '',
                biography: ''
              },
              {
                firstname: 'John',
                lastname: 'Doe',
                email: '',
                twitter: '',
                phone: '',
                biography: ''
              }]
            }]
      });


      var performances = utilsMethods.allPerformancesByFirstnameAndLastname(events, 'John', 'Doe');
      for (var i = 0; i < performances.length; i++) {
        var perfTitle = performances[i].title;
        var count = 0;
        for (var j = 0; j < performances.length; j++) {
          if (performances[j].title === perfTitle) {
            count++;
          }
        }
        expect(count).toBe(1);
      }
     });

   });




  // describe("when song has been paused", function() {
  //   beforeEach(function() {
  //     // player.play(song);
  //     // player.pause();
  //   });

  //   it("should indicate that the song is currently paused", function() {
  //     expect(player.isPlaying).toBeFalsy();

  //     // demonstrates use of 'not' with a custom matcher
  //     expect(player).not.toBePlaying(song);
  //   });

  //   it("should be possible to resume", function() {
  //     player.resume();
  //     expect(player.isPlaying).toBeTruthy();
  //     expect(player.currentlyPlayingSong).toEqual(song);
  //   });
  // });

});