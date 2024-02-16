import "./App.css";
import Header from "./Header";
import HomePage from "./HomePage";

export default function App() {
  return (
    <div className="h-[100vh] gap-4">
      <Header />
      <div style={{ marginTop: "36px" }}>
        {" "}
        {/* Add margin top to create space */}
        <HomePage />
      </div>
    </div>
  );
}
