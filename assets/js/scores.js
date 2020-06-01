function getTheHighScores() {
    var getStorageInfo = localStorage["browsergame"];
   

    if (getStorageInfo) {


        // parse info into array.
        getStorageInfo = JSON.parse(getStorageInfo);

        // sort array based on best scores
        var byScore = getStorageInfo.slice(0);
        
        byScore.sort(function(a, b) {
            return b.score - a.score;
        });

        for (i = 0; i > 7; i++) {

            // get the name and score of players but only do top 10 records

                var theName = byScore[i]["ui"];
                var theScore = byScore[i]["score"];
                var theDate = byScore[i]["dmy"];
                var myelement = document.createElement("div");
                myelement.innerHTML = theName + " ...  " + theScore + " ...  " + theDate;
                var appendthis = document.getElementById("theList");
                appendthis.appendChild(myelement);
        }
    } else {
        // so sad - no one has played and saved their game yet.
        // send them a teaser.

        var myelement = document.createElement("div");
        myelement.innerHTML = "No high scores ... yet";
        myelement.setAttribute("class", "highscores gameoverdahdah");
        var appendthis = document.getElementById("theList");
        appendthis.appendChild(myelement);

    }
}


document.addEventListener('DOMContentLoaded', function() {
    getTheHighScores();
}, false);
