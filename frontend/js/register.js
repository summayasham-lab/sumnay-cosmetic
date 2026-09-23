// Sumnay Cosmetic — register page logic

document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const msg = document.getElementById('form-msg');
  msg.className = 'form-msg';
  msg.textContent = '';

  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      msg.classList.add('error');
      msg.textContent = data.message || 'Registration failed. Please try again.';
      return;
    }

    setAuthToken(data.token);
    setCurrentUser(data.user);

    msg.classList.add('success');
    msg.textContent = 'Account created. Redirecting...';

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 800);

  } catch (err) {
    msg.classList.add('error');
    msg.textContent = 'Could not reach the server. Make sure the backend is running.';
  }
});
