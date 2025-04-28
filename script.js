let editors = [];
let currentEditor = 0;

// Configure Monaco
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs' }});

require(['vs/editor/editor.main'], function() {
  createNewTab();
  
  document.getElementById('newTabBtn').addEventListener('click', createNewTab);
});

function createNewTab() {
  const tabIndex = editors.length;
  
  // Create new editor div
  const editorDiv = document.createElement('div');
  editorDiv.className = 'editor';
  editorDiv.id = 'editor-' + tabIndex;
  document.getElementById('editor-container').appendChild(editorDiv);

  // Create Monaco Editor instance
  const editor = monaco.editor.create(editorDiv, {
    value: '-- New Lua file\n',
    language: 'lua',
    theme: 'vs-dark',
    automaticLayout: true
  });
  editors.push(editor);

  // Create Tab
  const tab = document.createElement('div');
  tab.className = 'tab';
  tab.innerText = 'Untitled ' + (tabIndex + 1);
  tab.dataset.index = tabIndex;
  tab.onclick = () => switchTab(tabIndex);
  document.getElementById('tabs').appendChild(tab);

  switchTab(tabIndex);
}

function switchTab(index) {
  editors.forEach((ed, i) => {
    document.getElementById('editor-' + i).classList.toggle('active', i === index);
    document.querySelector(`.tab[data-index="${i}"]`).classList.toggle('active', i === index);
  });
  currentEditor = index;
}

// --- Your Get Text Function ---
function getText() {
  return editors[currentEditor].getValue();
}

// Make getText globally available
window.getText = getText;
