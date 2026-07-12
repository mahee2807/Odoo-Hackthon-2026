document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('new-challenge')?.addEventListener('click', ()=>{
    alert('Create new challenge dialog (placeholder)');
  });
  document.querySelectorAll('.challenge .btn').forEach(b=>b.addEventListener('click', ()=>{
    alert('Joined challenge — upload proof when done (placeholder)');
  }));
});
