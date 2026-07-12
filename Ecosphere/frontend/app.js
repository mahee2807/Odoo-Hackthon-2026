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

  // Single DOMContentLoaded handler: tabs + auth wired to backend
  document.addEventListener('DOMContentLoaded', function(){
    // Tab switching
    const tabs = document.querySelectorAll('.app-tabs .tab');
    tabs.forEach(tab => tab.addEventListener('click', ()=>{
      const target = tab.dataset.target;
      tabs.forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.app-pane').forEach(p=>p.classList.add('hidden'));
      const pane = document.getElementById(target);
      if(pane) pane.classList.remove('hidden');
    }));
	
    // Auth/login handling (wired to backend)
    const overlay = document.getElementById('login-overlay');
    const form = document.getElementById('app-login-form');
    const demoBtn = document.getElementById('demo-signin');
    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = 'Logout';
    logoutBtn.className = 'btn';
	
    // Determine API endpoints to try. When developing locally, try both localhost and 127.0.0.1.
    const API_ENDPOINTS = (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
      ? ['http://127.0.0.1:3000', 'http://localhost:3000', '']
      : [''];
	
    function isAuth(){ return !!localStorage.getItem('ecosphere.token'); }
    function showOverlay(show){ if(!overlay) return; overlay.style.display = show ? 'flex' : 'none'; }
	
    // initial
    if(isAuth()) showOverlay(false); else showOverlay(true);
	
    // add logout button in topbar
    const topbarLeft = document.querySelector('.app-topbar .left');
    if(topbarLeft){
      logoutBtn.addEventListener('click', ()=>{ localStorage.removeItem('ecosphere.token'); localStorage.removeItem('ecosphere.user'); localStorage.removeItem('ecosphere.auth'); showOverlay(true); });
      topbarLeft.appendChild(logoutBtn);
    }
	
    const loginErrorEl = document.getElementById('login-error');
    function setLoginError(msg){
      if(!loginErrorEl) return; loginErrorEl.textContent = msg; loginErrorEl.style.display = msg ? 'block' : 'none';
    }

    async function doLogin(email, password){
      setLoginError('');
      let lastErr = null;
      for(const base of API_ENDPOINTS){
        const url = base ? `${base}/api/auth/login` : `/api/auth/login`;
        try{
          const res = await fetch(url, {
            method: 'POST', headers: { 'Content-Type':'application/json' },
            body: JSON.stringify({ email, password })
          });
          const data = await res.json();
          if(!res.ok) { lastErr = data.error || `HTTP ${res.status}`; continue; }
          // success
          localStorage.setItem('ecosphere.token', data.token);
          localStorage.setItem('ecosphere.user', JSON.stringify(data.user));
          localStorage.setItem('ecosphere.auth','1');
          showOverlay(false);
          setLoginError('');
          return data;
        } catch(err){
          lastErr = err.message || String(err);
          // try next endpoint
          continue;
        }
      }
      // all endpoints failed
      setLoginError('Unable to reach backend: ' + (lastErr || 'network error'));
      return Promise.reject(lastErr);
    }
	
    form?.addEventListener('submit', async function(e){
      e.preventDefault();
      const email = document.getElementById('login-email')?.value;
      const password = document.getElementById('login-password')?.value;
      if(!email || !password) return alert('Enter email and password');
      try{
        await doLogin(email, password);
      } catch(err){
        alert('Login error: ' + (err || 'unknown'));
      }
    });
	
    demoBtn?.addEventListener('click', async ()=>{
      const email = 'demo@ecos.com';
      const password = 'password123';
      try{
        await doLogin(email, password);
      } catch(err){
        alert('Demo login failed: ' + (err || 'unknown'));
      }
    });
	
  });
