$(document).ready(drawGrid);

function drawGrid()
{
    var grammarArray = new  Array();
    grammarArray.push({start:"S",end:"AB"});
    grammarArray.push({start:"A",end:"BB"});
    grammarArray.push({start:"A",end:"a"});
    grammarArray.push({start:"B",end:"AB"});
    grammarArray.push({start:"B",end:"b"});
    
    var word ="aabbb";
    
   var CYKArray =  doCYK(word,grammarArray);
   $("#concatContainer").append( createGrid(CYKArray.length,CYKArray[0].length));
    drawArray(CYKArray);
    
   
}

function drawArray(CYKArray)
{
    for(var outerIndex = 0; outerIndex < CYKArray.length; outerIndex++)
    {
        for(var innerIndex = 0; innerIndex < CYKArray[outerIndex].length; innerIndex++)
        {
            for(var characterArrayIndex = 0; characterArrayIndex < CYKArray[outerIndex][innerIndex].length; characterArrayIndex++)
            {
                $("#"+outerIndex+innerIndex).append(CYKArray[outerIndex][innerIndex][characterArrayIndex]);
            }
        }
    }
}

 function createGrid( rows, cols ){
  
    var rowNum = rows -1 ;
     
    var grid = document.createElement('table');
    grid.className = 'grid';
    
     for(var col = 1; col<=cols;  col++)
     {
        var tr = grid.appendChild(document.createElement('tr'));
        for (var row=0;row<col;++row){
            var element = document.createElement('td');
            element.id = rowNum+""+row;
            var cell = tr.appendChild(element);   
        }
         //set the id to the row the corresponds in the array
         rowNum --;
    
     }
    return grid;
}