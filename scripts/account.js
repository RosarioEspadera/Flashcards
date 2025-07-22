import { createClient } from 'https://esm.sh/@supabase/supabase-js';

const supabase = createClient('https://roqikwfaenwqipdydhwv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvcWlrd2ZhZW53cWlwZHlkaHd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MTYxMzksImV4cCI6MjA2ODE5MjEzOX0.CpUCA3X4bNIjOCtxrdOZ2kciXEHEogukBie9IOlHpno');

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const message = document.getElementById('auth-message');

document.getElementById('sign-in-btn').addEventListener('click', async (e) => {
  e.preventDefault();
  const { error } = await supabase.auth.signInWithPassword({
    email: emailInput.value,
    password: passwordInput.value,
  });
  message.textContent = error ? error.message : '✅ Signed in! Redirecting...';
  if (!error) location.href = 'index.html'; // or deck.html
});

document.getElementById('sign-up-btn').addEventListener('click', async () => {
  const { error } = await supabase.auth.signUp({
    email: emailInput.value,
    password: passwordInput.value,
  });
  message.textContent = error ? error.message : '✅ Account created! Check your email.';
});
