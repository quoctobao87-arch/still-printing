(function(){
  const vatRate=0.08;
  const parseMoney=text=>Number(String(text).replace(/[^0-9]/g,''))||0;
  const formatMoney=value=>Math.round(value).toLocaleString('vi-VN')+'đ';
  const quoteCells=Array.from(document.querySelectorAll('td')).filter(cell=>
    cell.querySelector('.price')&&cell.querySelector('.still span')&&cell.querySelector('.pick')
  );

  function captureBase(cell){
    cell.dataset.basePrice=String(parseMoney(cell.querySelector('.still span').textContent));
    cell.dataset.baseUnit=String(parseMoney(cell.querySelector('.unit-line span').textContent));
    cell.dataset.baseProfit=String(parseMoney(cell.querySelector('.profit-line span').textContent));
  }

  function renderCell(cell){
    const toggle=cell.querySelector('.vat-toggle');
    const basePrice=Number(cell.dataset.basePrice)||0;
    const baseUnit=Number(cell.dataset.baseUnit)||0;
    const baseProfit=Number(cell.dataset.baseProfit)||0;
    const priceInput=cell.querySelector('.price');
    const quantity=Number(priceInput.dataset.qty||priceInput.dataset.quantity)||1;
    const price=toggle.checked?Math.round(basePrice*(1+vatRate)):basePrice;
    const unit=toggle.checked?Math.round(price/quantity):baseUnit;
    cell.querySelector('.still span').textContent=formatMoney(price);
    cell.querySelector('.unit-line span').textContent=formatMoney(unit);
    cell.querySelector('.profit-line span').textContent=formatMoney(baseProfit);
    toggle.closest('.vat-label').style.background=toggle.checked?'#fff4cc':'transparent';
  }

  function refreshAll(){
    quoteCells.forEach(cell=>{
      captureBase(cell);
      renderCell(cell);
    });
  }

  quoteCells.forEach(cell=>{
    const label=document.createElement('label');
    label.className='vat-label';
    label.style.cssText='display:block;margin-top:5px;padding:3px;border-radius:5px;color:#a14b00;font-size:11px;font-weight:800;cursor:pointer';
    label.innerHTML='<input class="vat-toggle" type="checkbox"> + VAT 8%';
    const pickLabel=cell.querySelector('.pick')?.closest('label');
    if(pickLabel)cell.insertBefore(label,pickLabel);
    else cell.appendChild(label);
    captureBase(cell);
    label.querySelector('.vat-toggle').addEventListener('change',event=>{
      if(event.currentTarget.checked)captureBase(cell);
      renderCell(cell);
    });
  });

  document.addEventListener('input',event=>{
    if(event.target.matches('#markup,.price'))refreshAll();
  });
})();
