document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('[data-join]').forEach(btn=>btn.addEventListener('click', ()=>{
    alert('Thanks for joining — please upload proof when complete (placeholder)');
  }));

  document.getElementById('approve')?.addEventListener('click', ()=>{
    alert('Approved selected (placeholder)');
  });
  document.getElementById('reject')?.addEventListener('click', ()=>{
    alert('Rejected selected (placeholder)');
  });
  document.getElementById('new-activity')?.addEventListener('click', ()=>{
    alert('Create new activity modal (placeholder)');
  });
});
