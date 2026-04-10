// Google Apps Script 웹앱 URL
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwk9SeVKzy0FJbmCZ5cueDxHyzXY4n-9cc8rNU9ZgsDGPyHlRpHjxHyFHGuN1CGuq9y/exec";
console.log("app.js 실행됨");


async function sendToGoogleSheet(position) {
  const data = {
    email: localStorage.getItem("userEmail") || "cccijj@gmail.com",
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  };

  try {
    const response = await fetch(WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log("저장 성공:", result);
  } catch (error) {
    console.error("전송 실패:", error);
  }
}