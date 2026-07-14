import React from "react";

function App() {

  const bird1 = new Audio(
    "/bird1.mp3"
  );

  // Step 2: Un-comment the bird2 variable below
  // const bird2 = new Audio(
  //   "/bird2.mp3"
  // );

  function toggle1() {
    if (bird1.paused) {
      bird1.play();
    } else {
      bird1.pause();
    }
  };

  // Step 3: Define the toggle2 function here
  // It should work exactly like toggle1 but use bird2 variable


  return (
    <div>
      <button onClick={toggle1}>Caspian Tern 1</button>
      {/* Step 1: Add toggle2 function to the onClick attribute below */}
      <button onClick={}>Caspian Tern 2</button>
    </div>
  );
}

export default App;
