$(document).ready(function()
    {
        
        var state = 0;
        var jsonData;
        var currData;
        var score = 0;
        $.ajax(
                {
                    url:"data/questions.json",
                    dataType:"json",
                    // data: data.slice(1,3),
                    success:function(data)
                    {
                        // console.log("worked");

                        // $( data.slice(1,3) ).each( function(index, value)
                        // {
                        //     console.log( index, value );
                        // });

                        jsonData = data;
                        range = rangeDeterminer();
                        currData = data.slice( range[0], range[1] )
                        updateContent( currData );
                        localSaver();
                    }
                }
            );
        
        function rangeDeterminer() 
        {
            var range = [state * 4, state * 4 + 4];
            // console.log( range );
            return range;
        }

        function updateContent( data )
        {
            // console.log( data );
            // $( data.slice(1,3) ).each( function(index, value)
            // {
            //     console.log( index, value );
            // });

            // $(".panel-title").text();

            // $( data ).each( function(index, value)
            // {
            //     console.log( data );
            // });
            // for(var i=0; i<data.length; i++){
            //     console.log( data[i]["question"] );
            //     console.log( data[i]["options"] );
            //     // console.log( data[i] );
                
            // }
            contentSetter(data);

        }

        function contentSetter(slicedData)
        {
            var indexOfquestion = 0;
            var qTitles;
            var qOptions;
            var options = [];

            qTitles  = $(".panel-title");
            qOptions = $(".radio label");

            // fill question titles
            for(var i=0; i < qTitles.length; i++)
            {
                qTitles[i].textContent = slicedData[i]["question"];
            }

            // extracting options
            for(var i=0; i < 4; i++)
            {
                for(var j=0; j < 4; j++)
                {
                    options.push( slicedData[i]["options"][j]["title"] );
                }
                
            }

            // fill question options
            for(var i=0; i < qOptions.length; i++)
            {
                qOptions[i].innerHTML  = '<input type="radio" name="opt1">' + options[i];
            }
            // console.log(qOptions);
        }

        $(".panel").click(function()
        {
            var question = $(this).find( ".panel-title" ).text();
            var userAnswear = event.target.parentElement.innerText;
            $(this).find("input").attr('disabled', true);
            console.log(question, userAnswear);
            checkAnswear(question, userAnswear);
        });

        function checkAnswear(qs, ua)
        {
            var correctAns, userAnswearID;
            // console.log( qs, ua );
            // find correct answear of the selected question
            for(var i=0; i< currData.length; i++)
            {

                if ( currData[i]["question"] === qs )
                {
                    userAnswearID = currData[i]["id"];
                    // console.log( currData[i]["options"] );
                //     for (var j=0; j < currData[i]["options"].length; j++)
                //     {
                //         if( currData[i]["options"][j]["is_currect"] === true )
                //         {
                //             correctAns = currData[i]["options"][j]["title"];
                //         }
                //     }
                }
            }
            
            console.log(userAnswearID , ua);

            // saving user answears
            localStorage.setObj( "ua-" + userAnswearID, {answear:ua} );

            console.log( localStorage.getObj( "ua-1" ) );
        
            // if( correctAns === ua ) 
            // {
                
            //     // checkScore(true);
            // }else{
            //     // checkScore(false);
            // }
        }

        function checkScore(bool)
        {
            if(bool === true){
                score += 1;
            }

            console.log(score);            
        }

        $("button").click( function()
        {
            if( state < 4 ){
                state += 1;
                range = rangeDeterminer();
                currData = jsonData.slice( range[0], range[1] )
                updateContent( currData );
            }

        });

        // extend the default storage-objects
        Storage.prototype.setObj = function(key, obj) {
            return this.setItem(key, JSON.stringify(obj))
        }
        Storage.prototype.getObj = function(key) {
            return JSON.parse(this.getItem(key))
        }
        
        function localSaver() 
        {
            $.each(jsonData, function(i, obj) 
            {
                var questionID, questionAnswear, questionText;
                //use obj.id and obj.name here, for example:
                // alert(obj.name);
                $.each(obj["options"], function(index, item)
                {
                    if( item["is_currect"] === true)
                    {
                        // console.log(item["title"]);
                        questionAnswear = item["title"];
                    }
                    // console.log( item );
                });
                // console.log( obj["id"] );
                questionID = obj["id"] ;
                questionText = obj["question"] ;
                localStorage.setObj( questionID, {answear:questionAnswear, question:questionText} );
            });

            // localStorage.setObj(1, {answear:"OPT 1"});
            // localStorage.getObj(1)
        }
        
        
    }
);