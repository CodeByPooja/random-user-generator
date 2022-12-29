import "./App.css";
import { Button } from "react-bootstrap";
import { SectionDetails } from "./components/SectionDetails/SectionDetails";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "./components/Loader/Loader";

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDetails();
  }, []);

  const loadDetails = () => {
    setLoading(true);
    axios({
      method: "get",
      url: "https://randomuser.me/api",
    })
      .then((items) => {
        setUserData(items.data.results[0]);
      })
      .catch((error) => {
        console.log("Error while loading user details:", error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="user-generator-page">
      <div className="header-section">
        <h4>
          {userData?.name?.first} {userData?.name?.last}
        </h4>
        <Button variant="dark" onClick={loadDetails}>
          Generate New User
        </Button>
      </div>
      {loading ? <Loader /> : <SectionDetails detail={userData} />}
    </div>
  );
}

export default App;
