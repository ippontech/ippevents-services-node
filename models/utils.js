exports.allPerformancesByFirstnameAndLastname = function(events, firstname, lastname) {
	var performances = [];

	for(var t = 0; t < events.length; t++) {
      for (var i = 0; i < events[t].performances.length; i++) {
        var performance = events[t].performances[i];
        if(performance){
          for (var j = 0; j < performance.speakers.length; j++){
              var speaker = performance.speakers[j];
              if (lastname == speaker.lastname && firstname == speaker.firstname) {
                performances.push(performance);
              }
          }
        }
      }
    }

    return performances;
};
