import { TextEditor } from './TextEditor';

function App() {
  return (
    <div className="app-container">
      <h1>Text Editor with Statistics</h1>
      <TextEditor />
      <style>{`
        .app-container {
          min-height: 100vh;
          background: linear-gradient(45deg, #1a1a1a, #4a148c);
          margin: 0;
          padding: 2rem;
        }
        
        h1 {
          color: white;
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 2rem;
          text-shadow: 0 2px 10px rgba(74, 20, 140, 0.5);
        }
      `}</style>
    </div>
  );
}

export default App;