import { useState } from "react";
import "./App.css";
import HookForm from "./HookForm";
import ManualForm from "./ManualForm";

function App() {
  const [tab, setTab] = useState("hook");
  return (
    <>
      <div>
        <div className="shell">
          <h1 className="Job">Job Application</h1>
          <p>
            This job is for a software engineer position. We are looking for
            someone who is passionate about coding and has experience with
            React. The ideal candidate will have a strong understanding of
            JavaScript and be able to work well in a team environment.
          </p>
        </div>
        <div className="tab">
          <button
            onClick={() => setTab("manual")}
            className="bg-[#2a007f] text-[#eae2b7] font-semibold px-6 py-3 rounded-lg transition-transform active:scale-95"
          >
            Manual
          </button>

          <button
            onClick={() => setTab("hook")}
            className="bg-[#d62828] text-[#eae2b7] font-semibold px-6 py-3 rounded-lg transition-transform active:scale-95"
          >
            HookForm
          </button>
        </div>
        {tab === "manual" ? <ManualForm /> : <HookForm />}
      </div>
    </>
  );
}

export default App;
