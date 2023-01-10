import react from "react";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import { useSelector } from "react-redux";


function App() {
  //In order to use the state, use state followed by the name of the reducer that was used in the createSlice.
  //Then use the dot notation to get the value of the key you want.. ie... .name, .email etc..
  const userName = useSelector(state => state.user.name)
  return (
    <div className="App">
      
      <h3>This is the home page</h3>
      <h2>{userName}</h2>
      <Navbar/>
      <Register/>
    </div>
  );
}

export default App;
