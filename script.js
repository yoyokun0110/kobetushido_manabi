
let templates = [];
let categories = new Set();

fetch('GBP_templates_100.json')
  .then(response => response.json())
  .then(data => {
    templates = data;
    data.forEach(item => categories.add(item.category));
    populateCategories();
  });

function populateCategories() {
  const catSelect = document.getElementById('categorySelect');
  const tempSelect = document.getElementById('templateSelect');
  catSelect.innerHTML = '<option value="">--選択--</option>';
  [...categories].forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    catSelect.appendChild(option);
  });

  catSelect.addEventListener('change', () => {
    const selected = catSelect.value;
    const filtered = templates.filter(t => t.category === selected);
    tempSelect.innerHTML = '';
    filtered.forEach(t => {
      const option = document.createElement('option');
      option.value = t.id;
      option.textContent = `No.${t.id} - ${t.title}`;
      tempSelect.appendChild(option);
    });
  });

  tempSelect.addEventListener('change', () => {
    const selectedId = parseInt(tempSelect.value);
    const selected = templates.find(t => t.id === selectedId);
    if (selected) {
      document.getElementById('templateTitle').textContent = selected.title;
      document.getElementById('templateBody').value = selected.body;
    }
  });
}
