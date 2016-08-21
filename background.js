chrome.browserAction.onClicked.addListener(function(tab) {

    chrome.tabs.sendMessage(tab.id, { message : "clicked_browser_action" });

    var eventRecordingStarted = {
       type: "basic",
       title: "Event Detail Recording",
       message: "Event Detail Recording Succesfully started.",
       iconUrl: "icon.png"
    };

    var eventRecordingStopped = {
           type: "basic",
           title: "Event Detail Recording",
           message: "Event Detail Recording Succesfully stopped.",
           iconUrl: "icon.png"
    };

    chrome.notifications.create("", eventRecordingStarted, function(id) {
       if(chrome.runtime.lastError) {
         console.error(chrome.runtime.lastError.message);
       }
    });

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        console.log(request);
        if( request.message === "store" ) {
            var data = { url: tab.url, data: request.tbl };
            var client = new XMLHttpRequest();
            client.open("POST", "http://www.harvee.de/addEventFromChromeExtension");
            client.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            client.send(data);
            chrome.notifications.create("", eventRecordingStopped, function(id) {
                   if(chrome.runtime.lastError) {
                     console.error(chrome.runtime.lastError.message);
                   }
            });
            chrome.tabs.sendMessage(tab.id, { message : "event_stored" });
        }
    });
});