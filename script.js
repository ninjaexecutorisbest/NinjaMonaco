// After Monaco loads
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
