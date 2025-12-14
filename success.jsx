import { useLocation } from "react-router-dom";

const Success = () => {
  const { state } = useLocation();

  return (
    <div className="container">
      <h2>Form Submitted Successfully 🎉</h2>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};

export default Success;
