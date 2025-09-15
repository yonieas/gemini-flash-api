// --- Dashboard Navigation and Routing ---
const routes = [
  { path: '/text', section: 'view-text' },
  { path: '/image', section: 'view-image' },
  { path: '/document', section: 'view-document' },
  { path: '/audio', section: 'view-audio' },
];

function showSection(routePath) {
  routes.forEach(({ path, section }) => {
    document.getElementById(section).style.display = (path === routePath) ? '' : 'none';
    const btn = document.querySelector(`.nav-btn[data-route='${path}']`);
    if (btn) btn.classList.toggle('active', path === routePath);
  });
}

function navigate(routePath, replace = false) {
  showSection(routePath);
  if (!replace) history.pushState({}, '', routePath);
}

window.addEventListener('popstate', () => {
  const route = routes.find(r => r.path === location.pathname);
  if (route) showSection(route.path);
});

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const route = btn.getAttribute('data-route');
    navigate(route);
  });
});

// On load, route to current path or default to /text
const initialRoute = routes.find(r => r.path === location.pathname) ? location.pathname : '/text';
navigate(initialRoute, true);
document.getElementById('textForm').onsubmit = async function(e) {
  e.preventDefault();
  const prompt = document.getElementById('textPrompt').value;
  const resultDiv = document.getElementById('textResult');
  resultDiv.textContent = 'Loading...';
  const res = await fetch('/generate-text', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({prompt})
  });
  const data = await res.json();
  if (data.output) {
    resultDiv.innerHTML = marked.parse(data.output);
  } else {
    resultDiv.textContent = data.error || 'No response';
  }
};

document.getElementById('imageForm').onsubmit = async function(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData();
  formData.append('image', document.getElementById('imageInput').files[0]);
  formData.append('prompt', document.getElementById('imagePrompt').value);
  const resultDiv = document.getElementById('imageResult');
  resultDiv.textContent = 'Loading...';
  const res = await fetch('/generate-from-image', {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  resultDiv.textContent = data.output || data.error || 'No response';
};

document.getElementById('documentForm').onsubmit = async function(e) {
  e.preventDefault();
  const formData = new FormData();
  formData.append('document', document.getElementById('documentInput').files[0]);
  const resultDiv = document.getElementById('documentResult');
  resultDiv.textContent = 'Loading...';
  const res = await fetch('/generate-from-document', {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  if (data.output) {
    // Use marked.js to render markdown
    resultDiv.innerHTML = marked.parse(data.output);
  } else {
    resultDiv.textContent = data.error || 'No response';
  }
};

document.getElementById('audioForm').onsubmit = async function(e) {
  e.preventDefault();
  const formData = new FormData();
  formData.append('audio', document.getElementById('audioInput').files[0]);
  const resultDiv = document.getElementById('audioResult');
  resultDiv.textContent = 'Loading...';
  const res = await fetch('/generate-from-audio', {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  if (data.output) {
    resultDiv.innerHTML = marked.parse(data.output);
  } else {
    resultDiv.textContent = data.error || 'No response';
  }
};
