// Helper function to create table rows
function createTableRow(data) {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const symbolCell = document.createElement('td');
    const priceCell = document.createElement('td');
    const volumeCell = document.createElement('td');
    const marketCapCell = document.createElement('td');
    const percentageChangeCell = document.createElement('td');
    const imageCell = document.createElement('td');
  
    nameCell.textContent = data.name;
    symbolCell.textContent = data.symbol.toUpperCase();
    priceCell.textContent = '$' + data.current_price;
    volumeCell.textContent = '$' + data.total_volume.toLocaleString('en-US');
    marketCapCell.textContent = 'Mkt Cap : $' + data.market_cap.toLocaleString('en-US');
    percentageChangeCell.textContent = data.price_change_percentage_24h.toFixed(2) + '%';
    imageCell.innerHTML = `<img src="${data.image}" alt="${data.name}" width="25">`;
  
    // Add CSS classes based on positive or negative percentage change
    if (data.price_change_percentage_24h < 0) {
      percentageChangeCell.classList.add('negative');
    } else {
      percentageChangeCell.classList.add('positive');
    }
  
    row.appendChild(imageCell);
    row.appendChild(nameCell);
    row.appendChild(symbolCell);
    row.appendChild(priceCell);
    row.appendChild(volumeCell);
    row.appendChild(percentageChangeCell);
    row.appendChild(marketCapCell);
  
    return row;
  }
  
  
  // Fetch data using .then
  function fetchDataWithThen() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('tableBody');
  
        data.forEach(item => {
          const row = createTableRow(item);
          tableBody.appendChild(row);
        });
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }
  
  // Search functionality
  document.getElementById('searchButton').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const tableBody = document.getElementById('tableBody');
    const rows = tableBody.getElementsByTagName('tr');
  
    Array.from(rows).forEach(row => {
      const name = row.cells[1].textContent.toLowerCase();
      const symbol = row.cells[2].textContent.toLowerCase();
  
      if (name.includes(searchInput) || symbol.includes(searchInput)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
  
  // Sort by Market Cap functionality
  document.getElementById('sortMarketCapButton').addEventListener('click', () => {
    const tableBody = document.getElementById('tableBody');
    const rows = Array.from(tableBody.getElementsByTagName('tr'));
  
    rows.sort((a, b) => {
      const marketCapA = parseFloat(a.cells[5].textContent.replace(/[^0-9.-]+/g, ''));
      const marketCapB = parseFloat(b.cells[5].textContent.replace(/[^0-9.-]+/g, ''));
  
      return marketCapB - marketCapA;
    });
  
    rows.forEach(row => {
      tableBody.appendChild(row);
    });
  });
  
  // Sort by Percentage Change functionality
  document.getElementById('sortPercentageButton').addEventListener('click', () => {
    const tableBody = document.getElementById('tableBody');
    const rows = Array.from(tableBody.getElementsByTagName('tr'));
  
    rows.sort((a, b) => {
      const percentageChangeA = parseFloat(a.cells[6].textContent.replace(/[^0-9.-]+/g, ''));
      const percentageChangeB = parseFloat(b.cells[6].textContent.replace(/[^0-9.-]+/g, ''));
  
      return percentageChangeB - percentageChangeA;
    });
  
    rows.forEach(row => {
      tableBody.appendChild(row);
    });
  });
  
  // Fetch data with .then
  fetchDataWithThen();
  