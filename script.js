// script.js
// Reads URL query parameters and displays them as a table on results.html

document.addEventListener("DOMContentLoaded", function () {
  const resultsBody = document.getElementById("results-body");
  if (!resultsBody) return;

  const params = new URLSearchParams(window.location.search);

  if ([...params].length === 0) {
    resultsBody.innerHTML = "<tr><td colspan='2'>No data submitted.</td></tr>";
    return;
  }

  // Handle multi-value fields like 'courses'
  const seen = {};
  params.forEach((value, key) => {
    if (seen[key]) {
      // Append to existing row
      const existingCell = document.querySelector(`[data-key="${key}"]`);
      if (existingCell) {
        existingCell.textContent += ", " + value;
      }
    } else {
      seen[key] = true;
      const row = document.createElement("tr");
      row.innerHTML = `<td><strong>${key}</strong></td><td data-key="${key}">${value}</td>`;
      resultsBody.appendChild(row);
    }
  });
});
