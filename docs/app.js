// Google Apps Script 웹앱 URL
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxiTXPNgpepjptoDvR0_n-cSqyB7VeuwdKww9xIPW2Ql4tx5IVVzDrx7K1aC--Q2jOo/exec";
console.log("app.js 실행됨");


async function sendLocationBtn(position) {
  console.log("Btn 실행됨");
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