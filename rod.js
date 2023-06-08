function cutRod() {
  var totalLength = parseInt(document.getElementById("totalLength").value);
  var lengthsInput = document.getElementById("lengths").value;
  var profitsInput = document.getElementById("profits").value;

  var lengths = parseInput(lengthsInput);
  var profits = parseInput(profitsInput);

  if (!lengths || !profits || lengths.length !== profits.length) {
    alert("Invalid input. Please enter comma-separated numbers for lengths and profits.");
    return;
  }

  var n = lengths.length;
  var dp = new Array(n + 1).fill(0).map(() => new Array(totalLength + 1).fill(0));

  for (var i = 1; i <= n; i++) {
    for (var j = 1; j <= totalLength; j++) {
      if (lengths[i - 1] <= j) {
        dp[i][j] = Math.max(dp[i - 1][j], profits[i - 1] + dp[i][j - lengths[i - 1]]);
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  displayTable(dp);
  // append the result in p tag
  var resultElement = document.getElementById("res");
  resultElement.innerHTML = "The maximum profit obtained is: " + dp[n][totalLength];

  
}
function displayTable(dp) {
  var table = document.createElement("table");
  var tbody = document.createElement("tbody");

  // Add the first row with numbers from 0 to total length
  var firstRow = document.createElement("tr");
  var emptyCell = document.createElement("td");
  firstRow.appendChild(emptyCell);
  for (var j = 0; j < dp[0].length; j++) {
    var cell = document.createElement("td");
    cell.textContent = j;
    firstRow.appendChild(cell);
  }
  tbody.appendChild(firstRow);

  // Add the second row with zeros
  var secondRow = document.createElement("tr");
  var secondRowTitleCell = document.createElement("td");
  secondRowTitleCell.textContent = "0";
  secondRow.appendChild(secondRowTitleCell);
  for (var j = 0; j < dp[0].length; j++) {
    var cell = document.createElement("td");
    cell.textContent = "0";
    secondRow.appendChild(cell);
  }
  tbody.appendChild(secondRow);

  // Add the remaining rows and append dp
  for (var i = 2; i < dp.length; i++) {
    var row = document.createElement("tr");

    // Add the first column with numbers starting from 0 (excluding the first two rows)
    var firstCell = document.createElement("td");
    firstCell.textContent = i - 1;
    row.appendChild(firstCell);

    // Add the remaining cells with the values from dp array
    for (var j = 0; j < dp[i].length; j++) {
      var cell = document.createElement("td");
      cell.textContent = dp[i][j];
      row.appendChild(cell);
    }

    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  var resultElement = document.getElementById("result");
  resultElement.innerHTML = "";
  resultElement.appendChild(table);

}
function parseInput(input) {
  var trimmedInput = input.trim();
  if (!trimmedInput) {
    return null;
  }
  var values = trimmedInput.split(",").map(Number);
  return values.every(isValidNumber) ? values : null;
}

function isValidNumber(value) {
  return !isNaN(value) && value >= 0;
}