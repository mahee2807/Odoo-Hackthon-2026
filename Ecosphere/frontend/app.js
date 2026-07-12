document.addEventListener('DOMContentLoaded', function(){
  const tabs = document.querySelectorAll('.app-tabs .tab');
  tabs.forEach(tab => tab.addEventListener('click', ()=>{
    const target = tab.dataset.target;
    tabs.forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.app-pane').forEach(p=>p.classList.add('hidden'));
    const pane = document.getElementById(target);
    if(pane) pane.classList.remove('hidden');
  }));

  const overlay = document.getElementById('login-overlay');
  const form = document.getElementById('app-login-form');
  const demoBtn = document.getElementById('demo-signin');
  const logoutBtn = document.createElement('button');
  logoutBtn.textContent = 'Logout';
  logoutBtn.className = 'btn';

  function isAuth(){ return localStorage.getItem('ecosphere.auth') === '1'; }
  function showOverlay(show){ if(!overlay) return; overlay.style.display = show ? 'flex' : 'none'; }

  if(isAuth()) showOverlay(false); else showOverlay(true);

  const topbarLeft = document.querySelector('.app-topbar .left');
  if(topbarLeft){
    logoutBtn.addEventListener('click', ()=>{ localStorage.removeItem('ecosphere.auth'); showOverlay(true); });
    topbarLeft.appendChild(logoutBtn);
  }

  form?.addEventListener('submit', function(e){
    e.preventDefault();
    localStorage.setItem('ecosphere.auth','1');
    showOverlay(false);
  });

  demoBtn?.addEventListener('click', ()=>{
    const email = document.getElementById('login-email');
    const pass = document.getElementById('login-password');
    if(email) email.value = 'demo@ecos.com';
    if(pass) pass.value = 'password123';
    localStorage.setItem('ecosphere.auth','1');
    showOverlay(false);
  });
});
