chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
        $(document).ready(function() {

$( function() {
    $( "#dialog" ).dialog({
      autoOpen: false,
      show: {
        effect: "drop",
        duration: 100
      },
      hide: {
        effect: "drop",
        duration: 100
      },
      width: "50%",
      maxWidth: "768px"
    });
} );

$( function() {
    $( "#eventType" ).selectmenu();
} );

var dialog= '<div id="dialog" title="Event Details"> ' +
            '<div id="users-contain" class="ui-widget"> ' +
            '    <table id="eventDetails" class="ui-widget ui-widget-content"> ' +
            '      <thead> ' +
            '        <tr class="ui-widget-header "> ' +
            '          <th>Item</th> ' +
            '          <th>Type</th> ' +
            '        </tr> ' +
            '      </thead> ' +
            '      <tbody> ' +
            '      </tbody> ' +
            '    </table> ' +
            '</div>' +
            '<div class="widget">' +
            '<button id="btnContinue">Continue</button>&nbsp;' +
            '<button id="btnStore" class="myButton">Store Event</button>' +
            '</div>';

$("body").prepend(dialog);

var selectMenu = '<select name="eventType" id="eventType"> ' +
                    '<option selected="selected" value="title">Title</option> ' +
                    '<option value="description">Description</option> ' +
                    '<option value="time">Time & Date</option> ' +
                    '<option value="venue">Venue</option> ' +
                 '</select>';


$("body").mouseup(function() {
  if ($('#dialog').dialog('isOpen') === false) {
    var sel = window.getSelection().toString();
    if(sel.length) {
        $( "#eventDetails tbody" ).append( "<tr>" +
              "<td class='truncate'>" + sel + "</td>" +
              "<td class='truncate'>" + selectMenu + "</td>" +
            "</tr>" );
        $( "#dialog" ).dialog( "open" );
    }
  }
});

$( "#btnContinue" ).click(function() {
  $( "#dialog" ).dialog( "close" );
});

$( "#btnStore" ).click(function() {
  var tbl = $('table#eventDetails tr').get().map(function(row) {
    return $(row).find('td').get().map(function(cell) {
        var tagName = $(cell)[0].lastChild.tagName;
        if (typeof tagName != 'undefined') {
            return $(cell)[0].lastChild.value;
        } else {
            return $(cell).html();
        }
    });
  });
  chrome.runtime.sendMessage({ message: "store", data: tbl});
  $( "#dialog" ).dialog( "close" );
});

var link1=chrome.extension.getURL("icon.png");

$("body").css('cursor','url('+link1+'),auto');

});
}

if( request.message === "event_stored" ) {
        $("body").unbind('mouseup');
        $("body").css('cursor', 'default');
    }
  }
);
