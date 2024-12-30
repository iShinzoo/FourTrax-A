import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import React, { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const TextStatistics = Extension.create({
  name: 'textStatistics',
  addStorage() {
    return {
      words: 0,
      characters: 0,
    }
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('textStatistics'),
        view: () => ({
          update: (view) => {
            const text = view.state.doc.textContent
            this.storage.words = text.trim().split(/\s+/).filter(word => word.length > 0).length
            this.storage.characters = text.length
          },
        }),
      }),
    ]
  },
})

export const TextEditor = () => {
  const [stats, setStats] = useState({ words: 0, characters: 0 })

  const editor = useEditor({
    extensions: [StarterKit, TextStatistics],
    content: '<p>Start typing to see statistics...</p>',
    onUpdate: ({ editor }) => {
      setStats({
        words: editor.storage.textStatistics.words,
        characters: editor.storage.textStatistics.characters,
      })
    },
  })

  return (
    <div className="glass-container">
      <div className="statistics-bar">
        <div className="stat-box">
          <span className="stat-label">Words</span>
          <span className="stat-value">{stats.words}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Characters</span>
          <span className="stat-value">{stats.characters}</span>
        </div>
      </div>
      <EditorContent editor={editor} />
      <style>{`
        .glass-container {
          background: rgba(26, 26, 26, 0.3);
          backdrop-filter: blur(10px);
          border-radius: 1rem;
          border: 1px solid rgba(74, 20, 140, 0.2);
          padding: 2rem;
          max-width: 800px;
          margin: 0 auto;
          box-shadow: 0 8px 32px rgba(74, 20, 140, 0.2);
        }
        
        .statistics-bar {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
          padding: 1rem;
          background: rgba(74, 20, 140, 0.2);
          border-radius: 0.5rem;
        }
        
        .stat-box {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 0.5rem;
        }
        
        .stat-value {
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
        }
        
        .ProseMirror {
          color: white;
          min-height: 200px;
          padding: 1rem;
          background: rgba(74, 20, 140, 0.15);
          border-radius: 0.5rem;
          outline: none;
        }
        
        .ProseMirror p {
          margin: 0.5rem 0;
        }
      `}</style>
    </div>
  )
}

export default TextEditor;