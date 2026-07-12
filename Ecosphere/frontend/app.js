document.addEventListener('DOMContentLoaded', function(){
  const tabs = document.querySelectorAll('.app-tabs .tab');
  tabs.forEach(tab => tab.addEventListener('click', ()=>{
    const target = tab.dataset.target;
    // toggle active class
    tabs.forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    // show/hide panes
    document.querySelectorAll('.app-pane').forEach(p=>p.classList.add('hidden'));
    const pane = document.getElementById(target);
    if(pane) pane.classList.remove('hidden');
  }));
});
