<template>
  <main>
    <EditorContent v-if="editor" :editor="editor" />
  </main>
</template>

<script lang="ts">
import { Editor, EditorContent } from "@tiptap/vue-3";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Collaboration from "@tiptap/extension-collaboration";
import { HocuspocusProvider } from "@hocuspocus/provider";

export default {
  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
      provider: null,
    };
  },

  mounted() {
    this.provider = new HocuspocusProvider({
      url: "ws://localhost:1234",
      name: "example-document",
    });

    this.editor = new Editor({
      extensions: [
        Document,
        Paragraph,
        Text,
        Collaboration.configure({
          document: this.provider.document,
        }),
      ],
    });
  },

  beforeUnmount() {
    this.editor.destroy();
    this.provider.destroy();
  },
};
</script>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }
}

/* Placeholder (at the top) */
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}
</style>
