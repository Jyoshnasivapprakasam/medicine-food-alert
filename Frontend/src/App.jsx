import { useState } from "react";
import "./App.css";

function App() {
  const [medicine, setMedicine] = useState("");
  const [food, setFood] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkInteraction = async () => {
    if (!medicine || !food) {
      alert("Please select both medicine and food.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/check?medicine=${medicine}&food=${food}`
      );

      const data = await response.json();

      setResult(data);
    } catch (error) {
      alert("Could not connect to the backend.");
    }

    setLoading(false);
  };

  return (
    <div className="app">

      <header>
        <div className="logo">💊 MediFood Alert</div>

        <p>
          Check possible interactions between medicines and foods.
        </p>
      </header>

      <main>

        <section className="card">

          <h1>Medicine–Food Interaction Checker</h1>

          <p className="subtitle">
            Select a medicine and food to check for a possible interaction.
          </p>

          <div className="form">

            <div className="input-group">
              <label>Medicine</label>

              <select
                value={medicine}
                onChange={(e) => setMedicine(e.target.value)}
              >
                <option value="">Select medicine</option>
                <option value="warfarin">Warfarin</option>
                <option value="simvastatin">Simvastatin</option>
                <option value="metronidazole">Metronidazole</option>
              </select>
            </div>


            <div className="input-group">
              <label>Food / Drink</label>

              <select
                value={food}
                onChange={(e) => setFood(e.target.value)}
              >
                <option value="">Select food</option>
                <option value="spinach">Spinach</option>
                <option value="kale">Kale</option>
                <option value="grapefruit">Grapefruit</option>
                <option value="alcohol">Alcohol</option>
              </select>
            </div>


            <button onClick={checkInteraction}>
              {loading ? "Checking..." : "Check Interaction"}
            </button>

          </div>

        </section>


        {result && (
          <section
            className={`result ${
              result.found ? "warning" : "safe"
            }`}
          >

            <div className="result-icon">
              {result.found ? "⚠️" : "✅"}
            </div>

            <h2>
              {result.found
                ? "Possible Interaction"
                : "No Known Interaction"}
            </h2>

            <p className="combination">
              {result.medicine} + {result.food}
            </p>

            <div className={`severity ${result.severity.toLowerCase()}`}>
              Severity: {result.severity}
            </div>

            <p>{result.message}</p>

            <div className="recommendation">
              <strong>⚕️ Safety Information</strong>

              <p>{result.recommendation}</p>
            </div>

            <div className="why-section">
                <strong>🔬 What happens when they are combined?</strong>
                <p>
                  {result.what_happens}
                </p>
            </div>

            <div className="why-section">
              <strong>💡 Why does this interaction happen?</strong>
              <p>
                Some foods and drinks can change how medicines are absorbed,
                processed, or work in the body. The effect can depend on the
                specific medicine and the amount consumed.
              </p>
            </div>

          </section>
        )}


        <section className="info">

          <h2>How it works</h2>

          <div className="steps">

            <div>
              <span>1</span>
              <p>Select your medicine</p>
            </div>

            <div>
              <span>2</span>
              <p>Select food or drink</p>
            </div>

            <div>
              <span>3</span>
              <p>Check the interaction</p>
            </div>

            <div>
              <span>4</span>
              <p>Understand the result</p>
            </div>

          </div>

        </section>


        <section className="disclaimer">

          <strong>Important:</strong>

          <p>
            This application is for educational and informational
            purposes only. It does not replace professional medical
            advice. Do not stop or change prescribed medication based
            on this application.
          </p>

        </section>

      </main>

    </div>
  );
}

export default App;