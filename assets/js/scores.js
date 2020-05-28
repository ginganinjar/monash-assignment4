

      function getTheHighScores() {
        var getStorageInfo = localStorage["browsergame"];
     

          if (getStorageInfo) {
           
       
            // parse info into array.
            getStorageInfo =  JSON.parse(getStorageInfo);    
            
                // sort array based on best scores

            var byScore = getStorageInfo.slice(0);
            byScore.sort(function(a,b) {
                return b.score - a.score;
            });
           
           
                for (i=0;i < byScore.length; i++){
                
                        // get the name and score of players

                    theName = byScore[i]["ui"];
                    theScore = byScore[i]["score"];
                    theDate = byScore[i]["dmy"];
                    var myelement = document.createElement("div");
                    myelement.innerHTML = theName + " ...  " + theScore + " ...  " + theDate;
                    var appendthis = document.getElementById("theList");
                    appendthis.appendChild(myelement);


                }
            } else
                    {
                            // so sad - no one has played and saved their game yet.
                            // send them a teaser.
                           
                            var myelement = document.createElement("div");
                             myelement.innerHTML = "No high scores ... yet";
                             myelement.setAttribute("class", "highscores");
                              var appendthis = document.getElementById("theList");
                              appendthis.appendChild(myelement);

                    }

        }

    document.addEventListener('DOMContentLoaded', function() {
        getTheHighScores();
    }, false);

  