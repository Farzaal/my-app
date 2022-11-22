import React from 'react';
import {MonacoProvider, DiffEditor} from '@memsetzero/react-monaco-editor';

function Editor() {
  return (
    <div>
        <h1>Text</h1>
        <MonacoProvider theme="vs-dark">
        <Editor 
            style={{width: "100%", height: "600px"}}
            value="Hello, Monaco World!"
            options={{
            lineNumbers: false
            }}
        />
        </MonacoProvider>
    </div>
  );
}

export default Editor