function doCYK(word, grammarArray)
{
 
    var CYKArray = new Array();
    var CYKWord = word;
    grammarArray = new Array();
    grammarArray.push({start:"S", end:"AB"});
    grammarArray.push({start:"A", end:"BB"});
    grammarArray.push({start:"A", end:"a"});
    grammarArray.push({start:"B", end:"AB"});
    grammarArray.push({start:"B", end:"b"});
    
    CYKWord = "aabbb";
    
    
    for(var row = 0; row < CYKWord.length; row ++)
    {
        if(row == 0)
        {
            CYKArray[row] = new Array();
            for(var index = 0; index < CYKWord.length; index ++)
            {
                var tmpArray = checkIfGrammar(CYKWord[index],grammarArray);
                CYKArray[row][index]= tmpArray;
            }
            
        }
        else if(row == 1)
        {
            CYKArray[row] = new Array();
            for(var index = 0; index < (CYKWord.length -1); index ++)
            {
                CYKArray[row][index] = checkIfGrammarArray(CYKArray[0][index],CYKArray[0][index+1],grammarArray)
            }
            
        }
        else if ( row > 1)
        {
            CYKArray[row] = new Array();
            for(var index = 0; index < (CYKWord.length-row); index ++)
            {
                CYKArray[row][index] = new Array();
                for(var adjust = 0; adjust < row; adjust ++)
                {
                    CYKArray[row][index] = CYKArray[row][index].concat(checkIfGrammarArray(CYKArray[row - (adjust+1)][index],CYKArray[adjust][(index+row)-adjust],grammarArray));
                    CYKArray[row][index] = CYKArray[row][index].filter(distinct);
                }
                
                
            }
            
        }
    }
    alert("fail");
    
    function checkIfGrammar(start,grammarArray)
    {
        var toAddArray = new Array();
        for(var k =0; k<grammarArray.length; k++)
        {
            if(grammarArray[k].end == start)
            {
                toAddArray.push(grammarArray[k].start);
            }
        }
        return toAddArray;
    }
    function checkIfGrammarArray(array1,array2,grammarArray)
    {
        var newPermutationsArray = new Array();
        for(var array1Index = 0; array1Index < array1.length; array1Index++)
        {
            for(array2Index = 0; array2Index < array2.length; array2Index++)
            {
                var checkPermuatations = array1[array1Index] + array2[array2Index];
                newPermutationsArray = newPermutationsArray.concat(checkIfGrammar(checkPermuatations,grammarArray));
            }
        }
        return newPermutationsArray;
    }
    
    
    function distinct(value,index,self)
    {
        return self.indexOf(value) == index;
    }
}