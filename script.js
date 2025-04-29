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
        // General Lua constructs
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
          label: 'while',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'while ${1:condition} do\n\t${0}\nend',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'While loop'
        },

        // Roblox specific functions for exploiting/hacking
        {
          label: 'game',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'game',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Access the game object'
        },
        {
          label: 'workspace',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'workspace',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Access the workspace for manipulating parts and objects'
        },
        {
          label: 'getService',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'game:GetService("${1:ServiceName}")',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Access a Roblox service'
        },
        {
          label: 'players',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'game:GetService("Players")',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Access the Players service'
        },
        {
          label: 'player',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'game.Players.LocalPlayer',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Access the local player'
        },
        {
          label: 'findFirstChild',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'game.Workspace:FindFirstChild("${1:objectName}")',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Find an object by name in workspace'
        },
        {
          label: 'setmetatable',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'setmetatable(${1:table}, ${2:metatable})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Set the metatable for a table'
        },
        {
          label: 'getmetatable',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'getmetatable(${1:table})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Get the metatable of a table'
        },
        {
          label: 'teleport',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = ${1:CFrame.new()}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Teleport the player to a new position'
        },
        {
          label: 'firetouchinterest',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'game:GetService("Workspace").TouchInterest:Fire(${1:part}, ${2:player})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Fire a touch interest event'
        },
        {
          label: 'clone',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: '${1:part}:Clone()',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Clone an object'
        },
        {
          label: 'Destroy',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: '${1:part}:Destroy()',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Destroy an object'
        },
        {
          label: 'makeJoints',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: '${1:part}:MakeJoints()',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Make joints for a part'
        },
        {
          label: 'game.ReplicatedStorage',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'game.ReplicatedStorage',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Access ReplicatedStorage to store and retrieve game objects'
        },
        {
          label: 'create',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'game:GetService("InsertService"):Create("${1:AssetId}")',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Create a new object in the game using InsertService'
        },
        {
          label: 'setvalue',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: '${1:object}.Value = ${2:newValue}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Set a value on an object'
        },
        {
          label: 'ishidden',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'game.Workspace.${1:object}.Visible = false',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Set an object to be hidden'
        },
        {
          label: 'getChildren',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'game.Workspace:GetChildren()',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Get all children of a container'
        },
        {
          label: 'printidentity',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'printidentity()',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'prints leve;'
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
    value: '-- New Roblox Lua file\n',
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
    document.querySelector(.tab[data-index="${i}"]).classList.toggle('active', i === index);
  });
  currentEditor = index;
}

// --- Your Get Text Function ---
function getText() {
  return editors[currentEditor].getValue();
}

// Make getText globally available
window.getText = getText;
