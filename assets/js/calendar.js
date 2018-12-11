import $ from 'jquery';
import 'fullcalendar';
import 'fullcalendar/dist/gcal.js';
import credentials from './../../credentials.js';

$(function() {
  var containerEl = $('#calendar');

  containerEl.fullCalendar({
    googleCalendarApiKey: credentials.GOOGLE_CALENDAR_API_KEY,
    events: {
        googleCalendarId: 'platiafoodtruck@gmail.com'
    },
    themeSystem: 'bootstrap4',
    header: {
      left: 'prev,next',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    eventClick: function(event) {
       // opens events in a popup window
       window.open(event.url, 'gcalevent', 'width=700,height=600');
       return false;
     }
  });
});
