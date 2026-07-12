document.addEventListener('DOMContentLoaded', function(){
  const search = document.getElementById('search');
  const tbody = document.getElementById('goals-body');
  const rows = Array.from(tbody.querySelectorAll('tr'));

  search?.addEventListener('input', function(e){
    const q = (e.target.value || '').toLowerCase().trim();
    rows.forEach(r => {
      const text = r.textContent.toLowerCase();
      r.style.display = text.includes(q) ? '' : 'none';
    });
  });

  document.getElementById('new-goal')?.addEventListener('click', ()=>{
    alert('Open New Goal modal (placeholder)');
  });
  document.getElementById('edit-goal')?.addEventListener('click', ()=>{
    alert('Edit selected goal (placeholder)');
  });
  document.getElementById('delete-goal')?.addEventListener('click', ()=>{
    alert('Delete selected goal (placeholder)');
  });
});
