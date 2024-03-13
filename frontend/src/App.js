import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import EditActivityForm from "./components/EditActivityForm";
import ActivityStats from "./components/ActivityStats";
import UserProfileEditForm from "./components/UserProfileEditForm";



// pages & components
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";
import { AuthProvider } from "./hooks/AuthContext"; // Import the AuthProvider
import Dashboard from "./pages/Dashboard";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [activities, setActivities] = useState([]);

  const handleSaveActivity = (activityData) => {
    // make a post request to save the activity
    fetch("http://localhost:3001/api/activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activityData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setActivities([...activities, data]);
      })
      .catch((error) => {
        console.error("Error saving activity", error);
      });
  };

  return (
    <div className="App">
      <BrowserRouter>
        {/* Wrap the components with AuthProvider */}
        <AuthProvider>
          <Header
            isSignedIn={isSignedIn}
            setIsSignedIn={setIsSignedIn}
            userEmail={userEmail}
          />
          <div className="pages">
            <Routes>
              <Route
                path="/home"
                element={
                  <Home isSignedIn={isSignedIn} activities={activities} />
                }
              />
              <Route
                path="/activities"
                element={<ActivityForm onSave={handleSaveActivity} />}
              />
              <Route path="/activityList" element={<ActivityList />} />
              <Route path="/activityStats" element={<ActivityStats />} />
              <Route path="/activityForm" element={<ActivityForm />} />
              <Route path="/edit/:id" element={<EditActivityForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<UserProfile />} />

              <Route
                path="/signin"
                element={
                  <SignIn
                    setIsSignIn={setIsSignedIn}
                    setUserEmail={setUserEmail}
                  />
                }
              />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgotpassword" element={<ForgetPassword />} />
              <Route path="/resetpassword" element={<ResetPassword />} />

              <Route
                exact
                path="/profile/edit"
                component={UserProfileEditForm}
              />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
