$(document).ready(function()
{
    var userAnswears = [];
    var userScore = 0;
    // extend the default storage-objects
    Storage.prototype.setObj = function(key, obj) {
        return this.setItem(key, JSON.stringify(obj))
    }
    Storage.prototype.getObj = function(key) {
        return JSON.parse(this.getItem(key))
    }

    // console.log( localStorage.getObj(2) );

    checkScore();

    // for(var i=0; i<=20; i++)
    // {
    //     console.log(localStorage.getObj("ua-" + i)["answear"]);
    // }

    function checkScore()
    {
        for(var i=1; i <= 20; i++)
        {
            // console.log( localStorage.getObj(i)["question"] );
            // console.log( localStorage.getObj("ua-" + i)["answear"] );
            if( localStorage.getObj("ua-" + i) !== null )
            {
                if( localStorage.getObj(i)["answear"] === localStorage.getObj("ua-" + i)["answear"] )
                {
                    userAnswears.push(1);
                    console.log( localStorage.getObj("ua-" + i)["answear"] );
                }
                else
                {
                    userAnswears.push(0);
                }
                
            }
            else 
            {
                userAnswears.push(-1)
            }
        }
        // console.log( userAnswears );
        $(userAnswears).each( function(index, item){
            if( item === 1)
            {
                userScore += 1;
            }
        })
        // console.log( userScore );

        resultPageContentProducer();
    }


    function resultPageContentProducer()
    {
        // $(".table").html(function(){

        // });
        var tableRow = "";
        $("tbody").html("<tr><th>#</th><th>Question</th><th colspan='4'>Options</th></tr>");
        for(var i=1; i<=20; i++)
        {
            tableRow = "<tr><td>" + i + "</td><td>" + localStorage.getObj(i)["question"];

            var optionCells = "";
            // console.log(optionCells);

            if( userAnswears[i-1] === 1 )
            {
                if( localStorage.getObj(i)["answear"] === 'OPT 1' )
                {
                    optionCells = "</td><td class='success'>OPT 1</td><td>OPT 2</td><td>OPT 3</td><td>OPT 4</td></tr>";
                }
                else if( localStorage.getObj(i)["answear"] === 'OPT 2' )
                {
                    optionCells = "</td><td>OPT 1</td><td class='success'>OPT 2</td><td>OPT 3</td><td>OPT 4</td></tr>";
                }
                else if( localStorage.getObj(i)["answear"] === 'OPT 3' )
                {
                    optionCells = "</td><td>OPT 1</td><td>OPT 2</td><td class='success'>OPT 3</td><td>OPT 4</td></tr>";
                }
                else
                {
                    optionCells = "</td><td>OPT 1</td><td>OPT 2</td><td>OPT 3</td><td class='success'>OPT 4</td></tr>";
                }
            }

            else if( userAnswears[i-1] === 0 )
            {
                if( localStorage.getObj(i)["answear"] === 'OPT 1' )
                {
                    optionCells = "</td><td class='danger'>OPT 1</td><td>OPT 2</td><td>OPT 3</td><td>OPT 4</td></tr>";
                }
                else if( localStorage.getObj(i)["answear"] === 'OPT 2' )
                {
                    optionCells = "</td><td>OPT 1</td><td class='danger'>OPT 2</td><td>OPT 3</td><td>OPT 4</td></tr>";
                }
                else if( localStorage.getObj(i)["answear"] === 'OPT 3' )
                {
                    optionCells = "</td><td>OPT 1</td><td>OPT 2</td><td class='danger'>OPT 3</td><td>OPT 4</td></tr>";
                }
                else
                {
                    optionCells = "</td><td>OPT 1</td><td>OPT 2</td><td>OPT 3</td><td class='danger'>OPT 4</td></tr>";
                }
            }

            else
            {
                if( localStorage.getObj(i)["answear"] === 'OPT 1' )
                {
                    optionCells = "</td><td class='info'>OPT 1</td><td>OPT 2</td><td>OPT 3</td><td>OPT 4</td></tr>";
                }
                else if( localStorage.getObj(i)["answear"] === 'OPT 2' )
                {
                    optionCells = "</td><td>OPT 1</td><td class='info'>OPT 2</td><td>OPT 3</td><td>OPT 4</td></tr>";
                }
                else if( localStorage.getObj(i)["answear"] === 'OPT 3' )
                {
                    optionCells = "</td><td>OPT 1</td><td>OPT 2</td><td class='info'>OPT 3</td><td>OPT 4</td></tr>";
                }
                else
                {
                    optionCells = "</td><td>OPT 1</td><td>OPT 2</td><td>OPT 3</td><td class='info'>OPT 4</td></tr>";
                }
            }

            $("table").append( tableRow + optionCells);
            // console.log( optionCells )
        }
        $(".alert-success").text("You'r Score" + userScore);
        localStorage.clear();
    }   

});