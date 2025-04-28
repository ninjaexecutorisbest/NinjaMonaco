let editors = [];
let currentEditor = 0;

// Configure Monaco
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs' } });

require(['vs/editor/editor.main'], function () {
  createNewTab();

  document.getElementById('newTabBtn').addEventListener('click', createNewTab);

  // --- Lua Autocompletion ---
  monaco.languages.registerCompletionItemProvider('lua', {
    provideCompletionItems: () => {
      const suggestions = [
        {
          label: 'function',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'function ${1:name}(${2:params})\n\t${0}\nend',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Lua function'
        },
        {
          label: 'local',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'local ${1:var} = ${2:value}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Local variable'
        },
        {
          label: 'if',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'if ${1:condition} then\n\t${0}\nend',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'If statement'
        },
        {
          label: 'for',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'for ${1:i} = ${2:1}, ${3:10} do\n\t${0}\nend',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'For loop'
        },
        {
          label: 'print',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'print(${1:msg})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Print to output'
        },
        {
          label: 'pairs',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'for ${1:key}, ${2:value} in pairs(${3:table}) do\n\t${0}\nend',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Iterate over a table'
        },
        {
          label: 'while',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'while ${1:condition} do\n\t${0}\nend',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'While loop'
        }
      ];
      return { suggestions: suggestions };
    }
  });
});

// --- Tab System ---
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

  // Single click = switch tab
  tab.onclick = () => switchTab(tabIndex);

  // Double click = rename tab
  tab.ondblclick = (e) => {
    e.stopPropagation();
    renameTab(tab);
  };

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

function renameTab(tabElement) {
  const currentName = tabElement.innerText;
  const newName = prompt('Rename tab:', currentName);
  if (newName && newName.trim() !== '') {
    tabElement.innerText = newName.trim();
  }
}

// --- Your Get Text Function ---
function getText() {
  return editors[currentEditor].getValue();
}

// Make getText globally available
window.getText = getText;
