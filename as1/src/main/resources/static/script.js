// Setup
var rows = 1;
const table = document.getElementById("gradesTable");

var gradeInputs = table.querySelectorAll("input.numerator, input.denominator");
gradeInputs.forEach(function(input) {PercentUpdateListener(input)});

// Add a new row to the grades table and set up its elements.
function addRow()
{
    rows++;
    var newRow = table.insertRow();

    var c1 = newRow.insertCell();
    c1.textContent = "Activity " + rows;

    var c2 = newRow.insertCell();
    c2.textContent = "A" + rows;

    var input = document.createElement("input");
    input.className = "weight";
    input.min = 0;
    input.size = 3;
    var c3 = newRow.insertCell();
    c3.appendChild(input);

    var input1 = document.createElement("input");
    input1.className = "numerator";
    input1.min = 0;
    input1.size = 3;

    var input2 = document.createElement("input");
    input2.className = "denominator";
    input2.min = 0;
    input2.size = 3;

    PercentUpdateListener(input1);
    PercentUpdateListener(input2);

    var c4 = newRow.insertCell();
    c4.appendChild(input1);
    c4.appendChild(document.createTextNode(' / '));
    c4.appendChild(input2);

    var c5 = newRow.insertCell();
}

// Used to automatically update percentages when grades are changed
function PercentUpdateListener(input)
{
    input.addEventListener("input", function(event) 
    {
        var curRow = event.target.parentNode.parentNode;
    
        var rowNum = curRow.querySelector("td .numerator").value;
        var rowDenom = curRow.querySelector("td .denominator").value;
    
        curRow.lastElementChild.textContent = (rowNum / rowDenom * 100).toFixed(2) + "%";
    });
}

// Math functions
function ResultWeighted()
{
    var result = 0;
    var totalWeight = 0;

    var rows = Array.from(table.rows)
    for(var i = 1; i < rows.length; i++)
    {
        var grade = +rows[i].querySelector("td .numerator").value / +rows[i].querySelector("td .denominator").value;
        var weight = +rows[i].querySelector("td .weight").value;

        result += grade * weight;
        totalWeight += weight;
    }

    console.log(result);
    console.log(totalWeight);

    document.getElementById("resultText").textContent = (result / totalWeight * 100).toFixed(2) + "%";
}

function ResultMean()
{
    var result = 0;
    var totalItems = 0;

    var rows = Array.from(table.rows)
    for(var i = 1; i < rows.length; i++)
    {
        var grade = +rows[i].querySelector("td .numerator").value / +rows[i].querySelector("td .denominator").value;
        
        result += grade;
        totalItems++;
    }

    document.getElementById("resultText").textContent = (result / totalItems * 100).toFixed(2) + "%";
}