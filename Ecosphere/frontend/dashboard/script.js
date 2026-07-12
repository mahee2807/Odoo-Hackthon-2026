// Simple interactivity for dashboard quick actions
document.addEventListener('DOMContentLoaded', function(){
  const logBtn = document.getElementById('log-data');
  const chalBtn = document.getElementById('start-challenge');
  const reportsBtn = document.getElementById('view-reports');

  logBtn?.addEventListener('click', ()=>{
    // simulated modal / navigation
    alert('Open Log Carbon Data dialog (placeholder)');
  });

  chalBtn?.addEventListener('click', ()=>{
    alert('Challenge started — good luck!');
  });

  reportsBtn?.addEventListener('click', ()=>{
    alert('Navigating to Reports (placeholder)');
  });
});
