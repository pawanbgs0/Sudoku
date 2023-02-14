var board = [];

function isValid(num, row, col, board) 
{
    for (let i = 0; i < 9; i++) 
    {
        if (board[row][i] == num) 
        {
            return false;
        }

        if (board[i][col] == num) 
        {
            return false;
        }

        if (board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] == num) 
        {
            return false;
        }
    }
    return true;
}


function SolveSudoku(board) 
{
    for (let i = 0; i < 9; i++) 
    {
        for (let j = 0; j < 9; j++) 
        {
            if (board[i][j] == "0") 
            {
                for (let ch = "1"; ch <= "9"; ch++) 
                {
                    if (isValid(ch, i, j, board)) 
                    {
                        board[i][j] = ch;
            
                        if (SolveSudoku(board)) 
                        {
                            return true;
                        }
            
                        board[i][j] = "0";
                    }
                }
                return false;
            }
        }
    }
    return true;
}

const solve = document.getElementById("solve")
const reset = document.getElementById("reset")

solve.addEventListener("click", function(){
    for (var i = 0; i < 9; i++)
    {
        board[i] = [];
        for (var j = 0; j < 9; j++)
        {
            let inputVal = document.getElementById(i + "-" + j).value;
            if (inputVal == "")
                board[i][j] = "0";
            else
                board[i][j] = inputVal;
        }
    }
    if (SolveSudoku(board))
    {
        console.log(board);
        for (var i = 0; i < 9; i++)
        {
            for (var j = 0; j < 9; j++)
            {
                document.getElementById(i + "-" + j).value = board[i][j];
            }
        }
    }
    else
    {
        for (var i = 0; i < 9; i++)
        {
            for (var j = 0; j < 9; j++)
            {
                document.getElementById(i + "-" + j).value = "*";
            }
        }
    }
})


reset.addEventListener("click", function(){
    for (var i = 0; i < 9; i++)
    {
        for (var j = 0; j < 9; j++)
        {
            document.getElementById(i + "-" + j).value = "";
            board[i][j] = "0";
        }
    }
    
})