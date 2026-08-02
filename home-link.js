(function(){
  if(document.querySelector('.still-home-link'))return;
  const style=document.createElement('style');
  style.textContent='.still-home-link{position:fixed;top:max(12px,env(safe-area-inset-top));right:12px;z-index:9000;display:inline-flex;align-items:center;gap:7px;padding:10px 14px;border:1px solid #ffffff55;border-radius:999px;background:#10283f;color:#fff!important;box-shadow:0 8px 24px #10283f40;font:700 13px/1 Arial,sans-serif;text-decoration:none!important;transition:transform .18s,box-shadow .18s}.still-home-link:hover{transform:translateY(-2px);box-shadow:0 12px 30px #10283f55}.still-home-link:focus-visible{outline:3px solid #f6d657;outline-offset:2px}@media(max-width:520px){.still-home-link{top:max(8px,env(safe-area-inset-top));right:8px;padding:9px 12px;font-size:12px}}@media print{.still-home-link{display:none!important}}';
  document.head.appendChild(style);
  const link=document.createElement('a');
  link.className='still-home-link';
  link.href='./';
  link.setAttribute('aria-label','Quay về trang chủ');
  link.innerHTML='<span aria-hidden="true">←</span> Trang chủ';
  document.body.appendChild(link);
})();
