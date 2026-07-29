const foldedFlyerData = [
  {
    title: 'TỜ GẤP 63 × 29,7 CM + CẤN 2 ĐƯỜNG (IN 2 MẶT)',
    product: 'Tờ gấp 63 × 29,7 cm — cấn 2 đường, in 2 mặt',
    quantities: [200, 300, 500, 1000, 2000],
    rows: [
      ['Couche 150', [1400000, 1600000, 1800000, 2350000, 3600000]],
      ['Couche 200', [1500000, 1700000, 1950000, 2550000, 3750000]],
      ['Couche 250', [1600000, 1800000, 2150000, 2800000, 4500000]],
      ['Couche 300', [1750000, 1900000, 2250000, 3000000, 4700000]],
      ['Cán màng 2 mặt', [210000, 270000, 420000, 820000, 1120000]],
      ['Gấp thành phẩm', [100000, 150000, 250000, 400000, 600000]]
    ]
  },
  {
    title: 'TỜ GẤP 84 × 29,7 CM + CẤN 3 ĐƯỜNG (IN 2 MẶT)',
    product: 'Tờ gấp 84 × 29,7 cm — cấn 3 đường, in 2 mặt',
    quantities: [200, 300, 500, 1000, 2000],
    rows: [
      ['Couche 150', [1600000, 1750000, 2100000, 2750000, 4000000]],
      ['Couche 200', [1650000, 1850000, 2200000, 2800000, 4400000]],
      ['Couche 250', [1750000, 1950000, 2300000, 3000000, 5100000]],
      ['Couche 300', [1850000, 2100000, 2500000, 3500000, 5700000]],
      ['Cán màng bóng/mờ', [270000, 360000, 590000, 1120000, 2100000]],
      ['Gấp thành phẩm', [150000, 200000, 300000, 500000, 700000]]
    ]
  }
];

const foldedTables = foldedFlyerData.map(table => `
  <section class="section folded-section">
    <div class="heading">${table.title}</div>
    <table>
      <thead>
        <tr>
          <th>GIẤY / GIA CÔNG</th>
          ${table.quantities.map(quantity => `<th>${quantity.toLocaleString('vi-VN')}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${table.rows.map((row, rowIndex) => `
          <tr class="${rowIndex === 5 ? 'fold-fee-row' : ''}">
            <th>${row[0]}</th>
            ${row[1].map((price, columnIndex) => `
              <td>
                <input
                  class="price"
                  data-folded-table="${table.product}"
                  data-column="${columnIndex}"
                  data-kind="${rowIndex < 4 ? 'paper' : rowIndex === 4 ? 'lamination' : 'folding'}"
                  data-qty="${table.quantities[columnIndex]}"
                  type="text"
                  inputmode="numeric"
                  value="${price.toLocaleString('vi-VN')}"
                >
                ${rowIndex < 4 ? '<div class="fold-included" style="font-size:11px;color:#65747c">Đã cộng phí gấp</div>' : ''}
                <div class="still">Still: <span>—</span></div>
                <div class="still unit-line">1 tờ: <span>—</span></div>
                <div class="still profit-line">Lời: <span>—</span></div>
                ${rowIndex === 5 ? '<div style="margin-top:5px;color:#854F0B;font-size:11px;font-weight:700">Tự cộng vào giá giấy</div>' : `
                <label style="display:block;margin-top:5px;color:#854F0B;font-size:11px;font-weight:700;cursor:pointer">
                  <input
                    class="pick"
                    type="checkbox"
                    data-product="${table.product}"
                    data-paper="${row[0]}${rowIndex < 4 ? ' (đã gồm phí gấp thành phẩm)' : ''}"
                    data-qty="${table.quantities[columnIndex].toLocaleString('vi-VN')}"
                  >
                  Tick để copy <span class="copied"></span>
                </label>`}
              </td>
            `).join('')}
          </tr>
        `).join('')}
      </tbody>
    </table>
  </section>
`).join('');

function foldedNumber(input) {
  return Number(input.value.replace(/[^0-9]/g, '')) || 0;
}

function updateFoldedTotals() {
  const markup = (Number(document.querySelector('#markup').value) || 0) / 100;
  document.querySelectorAll('.folded-section').forEach(section => {
    section.querySelectorAll('input[data-kind="paper"]').forEach(paperInput => {
      const column = paperInput.dataset.column;
      const foldingInput = section.querySelector(`input[data-kind="folding"][data-column="${column}"]`);
      const combinedCost = foldedNumber(paperInput) + foldedNumber(foldingInput);
      const stillPrice = Math.ceil(combinedCost * (1 + markup) / 1000) * 1000;
      const quantity = Number(paperInput.dataset.qty) || 1;
      const cell = paperInput.closest('td');
      cell.querySelector('.still span').textContent = fmt(stillPrice) + 'đ';
      cell.querySelector('.unit-line span').textContent = fmt(stillPrice / quantity) + 'đ';
      cell.querySelector('.profit-line span').textContent = fmt(stillPrice - combinedCost) + 'đ';
    });
  });
}

function updateFlyerFormula() {
  const markup = (Number(document.querySelector('#markup').value) || 0) / 100;
  const ratio = (1 + markup).toLocaleString('vi-VN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  document.querySelector('#formula').textContent =
    `Giá Still = Giá gia công × ${ratio} · 1 tờ = Giá Still ÷ số lượng · Lời = Giá Still − Giá gia công`;
}

document.querySelector('#tables').insertAdjacentHTML('beforeend', foldedTables);
document.querySelectorAll('.folded-section .price').forEach(input => {
  input.addEventListener('input', update);
  input.addEventListener('input', updateFoldedTotals);
  input.addEventListener('input', updateFlyerFormula);
});
document.querySelector('#markup').addEventListener('input', updateFoldedTotals);
document.querySelector('#markup').addEventListener('input', updateFlyerFormula);
update();
updateFoldedTotals();
updateFlyerFormula();
