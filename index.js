var board = [];

function checkRow(board, row) 
{
    let map = new Map();
    
    for (let i = 0; i < 9; i++) 
    {
        if (board[row][i] < '0' || board[row][i] > '9') 
        {
            return false;
        }

        if (board[row][i] === '0') 
        {
            continue;
        }
        else if (!map.has(board[row][i])) 
        {
            map.set(board[row][i], 1);
        }
        else 
        {
            return false;
        }
    }
    
    return true;
}
  

function checkCol(board, col) 
{
    let map = new Map();
    
    for (let i = 0; i < 9; i++) 
    {
        if (board[i][col] < '0' || board[i][col] > '9') 
        {
            return false;
        }

        if (board[i][col] === '0') 
        {
            continue;
        }
        else if (!map.has(board[i][col])) 
        {
            map.set(board[i][col], 1);
        }
        else 
        {
            return false;
        }
    }
    
    return true;
}
  

function checkBox(board, row, col) 
{
    let map = new Map();
    
    for (let i = row; i < row + 3; i++) 
    {
        for (let j = col; j < col + 3; j++) 
        {
            if (board[i][j] < '0' || board[i][j] > '9') 
            {
                return false;
            }
            if (board[i][j] === '0') 
            {
                continue;
            }
            else if (!map.has(board[i][j])) 
            {
                map.set(board[i][j], 1);
            }
            else 
            {
                return false;
            }
        }
    }
    
    return true;
}
  
function isValidSudoku(board) 
{
    // Check rows and columns
    for (let i = 0; i < 9; i++) 
    {
        if (checkRow(board, i) === false || checkCol(board, i) === false) 
        {
            return false;
        }
    }
    
    // Check 3x3 sub-boxes
    for (let i = 0; i < 9; i += 3) 
    {
        for (let j = 0; j < 9; j += 3) 
        {
            if (checkBox(board, i, j) === false) 
            {
                return false;
            }
        }
    }
    
    return true;
  }
  



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
    if (isValidSudoku(board))
    {
        SolveSudoku(board);

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
        errorMessage();
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


function errorMessage() 
{
    var popup = document.getElementById("popup-message");
    popup.style.display = "block";
}

function closeMessage() 
{
    var popup = document.getElementById("popup-message");
    popup.style.display = "none";
}