export const signOutUser = async (setIsSignedIn, userEmail) => {
  try {
    const response = await fetch("http://localhost:3001/api/user/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail }),
    });

    if (response.ok) {
      console.log("User has signed out");
      setIsSignedIn(false);
    } else {
      console.error("Sign-out request failed:", response.statusText);
    }
  } catch (error) {
    console.error("Sign-out request error:", error.message);
  }
};
