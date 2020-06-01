function getTheHighScores() {
    var getStorageInfo = localStorage["browsergame"];
   

    if (getStorageInfo) {


        // parse info into array.
        getStorageInfo = JSON.parse(getStorageInfo);

        // sort array based on best scores
        var byScore = getStorageInfo.slice(0);
        
        const topScore = byScore.sort((a, b) => b.score - a.score).slice(0, 8);
        if (topScore.length > 0) {
            topScore.forEach((score) => {
                var theName = score.ui;
                var theScore = score.score;
                var theDate = score.dmy;
                var myelement = document.createElement("div");
                myelement.innerHTML = theName + " ... " + theScore + " ... " + theDate;
                var appendthis = document.getElementById("theList");
                appendthis.appendChild(myelement);  
            });
        } else {
            var myelement = document.createElement("div");
            myelement.innerHTML = "No high scores ... yet";
            myelement.setAttribute("class", "highscores gameoverdahdah");
            var appendthis = document.getElementById("theList");
            appendthis.appendChild(myelement);  
        }
}
}

document.addEventListener('DOMContentLoaded', function() {
    getTheHighScores();
}, false);
