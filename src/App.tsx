import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (username && password) {
      navigate("/dashboard")
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-background text-foreground">
      <div className="max-w-xl w-full text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight">
          Your AI for system design
        </h1>
        <p className="text-muted-foreground text-base">
          Learn how to design real-world systems, step by step.
        </p>
        <button
          onClick={() => setOpen(true)}
          className="px-5 py-2 border border-foreground/20 rounded-md text-sm hover:bg-foreground hover:text-background transition-colors"
        >
          Log in
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-foreground/20 flex items-center justify-center px-6"
          onClick={() => setOpen(false)}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="bg-background border border-foreground/15 rounded-md p-6 w-full max-w-sm space-y-4"
          >
            <h2 className="text-lg font-medium">Log in</h2>
            <div className="space-y-2">
              <label
                className="block text-sm text-muted-foreground"
                htmlFor="u"
              >
                Username
              </label>
              <input
                id="u"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-foreground/15 rounded-md bg-background text-sm focus:outline-none focus:border-foreground/40"
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm text-muted-foreground"
                htmlFor="p"
              >
                Password
              </label>
              <input
                id="p"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-foreground/15 rounded-md bg-background text-sm focus:outline-none focus:border-foreground/40"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm border border-foreground/20 rounded-md hover:bg-foreground hover:text-background transition-colors"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}

export default App;
