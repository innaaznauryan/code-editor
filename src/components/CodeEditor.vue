<template>
  <div class="controls">
    <select
        v-model="language"
        class="language-select"
    >
      <option
          v-for="(name, value) in LANGUAGES"
          :key="value"
          :value="value"
      >
        {{ name }}
      </option>
    </select>
    <button @click="runCode">Run</button>
  </div>

  <div class="editor-container">
    <div class="problem">
      <pre>{{ problem }}</pre>
    </div>
    <VueMonacoEditor
        v-model:value="code"
        theme="vs-dark"
        :options="MONACO_EDITOR_OPTIONS"
        :language="language"
        @mount="handleMount"
        class="editor"
    />
  </div>

  <div class="output">
    <h2>Output:</h2>
    <pre :class="{ 'error': hasError }">
      {{ result }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { VueMonacoEditor } from '@guolao/vue-monaco-editor';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import { LANGUAGES } from '../constants/languages';
import { MONACO_EDITOR_OPTIONS } from '../constants/options';

defineProps({
  problem: {
    type: String,
    required: true,
  }
});

const editorRef = shallowRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);
const code = ref<string>('// Type your code here...');
const language = ref<string>('javascript');
const result = ref<string>('');
const hasError = ref<boolean>(false);

const handleMount = (editor: monacoEditor.editor.IStandaloneCodeEditor) => {
  editorRef.value = editor;
};

const runCode = async () => {
  try {
    const response = await fetch('/api/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language: language.value,
        code: code.value
      }),
    });

    const data = await response.json();

    if (data.status === 'success') {
      result.value = data.output;
      hasError.value = false;
    } else {
      result.value = data.error;
      hasError.value = true;
    }
  } catch (error) {
    result.value = `${(error as Error).name}: ${(error as Error).message}`;
    hasError.value = true;
  }
};
</script>

<style scoped>
.controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 18px;
}

.language-select {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #0056b3;
}

.editor-container {
  display: flex;
  gap: 20px;
}

.problem {
  width: calc(50% - 10px);
  height: 60vh;
  background: #282c34;
  color: white;
  padding: 15px;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
}

.editor {
  width: calc(50% - 10px) !important;
  height: 60vh !important;
  border: 1px solid #ccc;
}

.output {
  margin-top: 20px;
  padding: 15px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}

h2 {
  text-align: center;
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}

.error {
  color: red;
}

@media (max-width: 768px) {
  .editor-container {
    flex-direction: column;
    height: auto;
  }
  .problem, .editor {
    width: 100% !important;
  }
  button, .language-select {
    width: 100%;
    max-width: 200px;
  }
}
</style>