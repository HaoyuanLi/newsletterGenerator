var baseURL = "http://services.calendar.events.ubc.ca/cgi-bin/rssCache.pl?mode=list&calPath=%2Fpublic%2FEvents+Calendar%2FCentre+for+Excellence+in+Indigenous+Health&calPath=%2Fpublic%2FEvents+Calendar%2FCancer+Prevention+Centre&calPath=%2Fpublic%2FEvents+Calendar%2FCHEOS&calPath=%2Fpublic%2FEvents+Calendar%2FCentre+for+Clinical+Epidemiology+and+Evaluation&calPath=%2Fpublic%2FEvents+Calendar%2FCentre+for+Health+Services+and+Policy+Research&calPath=%2Fpublic%2FEvents+Calendar%2FHuman+Early+Learning+Partnership&calPath=%2Fpublic%2FEvents+Calendar%2FPopulation+Data+BC&calPath=%2Fpublic%2FEvents+Calendar%2FSPPH+Internal&calPath=%2Fpublic%2FEvents+Calendar%2FSchool+of+Population+and+Public+Health&calPath=%2Fpublic%2FEvents+Calendar%2FTerreWEB&calPath=%2Fpublic%2FEvents+Calendar%2FW+Maurice+Young+Centre+for+Applied+Ethics&";
var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toUTCString(); }, 500);
    };
    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    Greeter.prototype.main = function (startDate, endDate) {
        //start = 2017 - 05 - 28 & end=2017 - 06 - 02
        var newURL = baseURL + "start=2017-" + startDate + "&end=2017-" + endDate;
        console.log(newURL);
        return this.calendarFetcher(newURL);
    };
    Greeter.prototype.calendarFetcher = function (url) {
        var res = new XMLHttpRequest();
        var content;
        var result;
        var arrayOfRes;
        var startTime;
        var startDate;
        var objectTBParsed;
        var finalLink;
        var startTimeTwo;
        var startDateTwo;
        var tableLink;
        var finalLoc;
        var arrayOfEvents = [];
        res.overrideMimeType('application/xml');
        res.onreadystatechange = function () {
            if (res.readyState == 4 && res.status == 200) {
                var finalRes = res.response;
                //console.log("response 1: " + res.responseXML);
                //console.log("response 2: " + res.response);
                //result = document.getElementById('result');
                //startDate = document.getElementById('startDate');
                //startTime = document.getElementById('startTime');
                startDateTwo = document.getElementById('startDate2');
                startTimeTwo = document.getElementById('startTime2');
                tableLink = document.getElementById('titleLink2');
                finalLoc = document.getElementById('finalLocation');
                //result.innerHTML = res.response;
                var arrayOfRes = finalRes.split("document.write");
                for (var i = 0; i < arrayOfRes.length; i++) {
                    if (arrayOfRes[i].includes('bwitem')) {
                        objectTBParsed = arrayOfRes[i];
                        arrayOfEvents.push(arrayOfRes[i]);
                    }
                }
                console.log("see the events: " + arrayOfEvents);
                // the following code analyses one item
                var objectsParsed = objectTBParsed.split("</div>");
                // the following part parses clickable link
                var titleAndLink = objectsParsed[0];
                var newLink = titleAndLink.split("<a");
                finalLink = "<a" + newLink[1];
                console.log(finalLink);
                //result.innerHTML = finalLink;
                tableLink.innerHTML = finalLink;
                //console.log("parsed url and some other stuff: " + objectsParsed[0]);
                //console.log("TO BE PARSED: " + objectTBParsed);
                // the following part parses start date
                var timeAndDate = objectsParsed[1];
                var newTime = timeAndDate.split("2017");
                console.log("currentTime: " + newTime[0]);
                var date = newTime[0];
                var newDate = date.split('bwdescription');
                var newNewDate = newDate[1].split(' ');
                var dateOfMonth = newNewDate[2].replace(',', '');
                var finalDate = newNewDate[1] + ' ' + dateOfMonth;
                //startDate.innerHTML = finalDate;
                startDateTwo.innerHTML = finalDate;
                //the following part deals with time
                var time = newTime[1];
                var finalTime = time.split("-");
                var finalFinalTime = finalTime[0];
                //startTime.innerHTML = finalFinalTime;
                startTimeTwo.innerHTML = finalFinalTime;
                //the following part deals with location
                finalLoc.innerHTML = "See description";
            }
        };
        res.open("GET", url, true);
        res.send();
        //console.log("sth: " + res.responseXML);
        //console.log(content);
        //return content;
        /*var separatedSentences = content.split('document.write');

        for (let i = 0; i < separatedSentences.length; i++) {
            console.log("number" + i + "th: " + separatedSentences[i]);
        }*/
        /*var result = document.getElementById('result');
        result.innerHTML = content;*/
    };
    return Greeter;
}());
window.onload = function () {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};
function validateRequest() {
    var luserInput = document.getElementById('userInput');
    var processedInput = luserInput.value;
    var dates = processedInput.split(',');
    var startDate = dates[0];
    var endDate = dates[1];
    console.log(startDate);
    console.log(endDate);
    console.log("this should be user input: " + processedInput);
    var newProcess = new Greeter(luserInput);
    var results = newProcess.main(startDate, endDate);
    console.log("the response: " + results);
}
/*    <h3>Date</h3>
    <div id="startDate" style="width:50%"></div>

    <h3>Time</h3>
    <div id="startTime" style="width:50%"></div>

    <h3>Clickable title</h3>
    <div id="result" style="width:50%"></div>

    <h3>Location</h3>
    <div id="result" style="width:50%"></div>*/ 
//# sourceMappingURL=app.js.map