// Google Apps Script 웹앱 URL
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxiTXPNgpepjptoDvR0_n-cSqyB7VeuwdKww9xIPW2Ql4tx5IVVzDrx7K1aC--Q2jOo/exec";
console.log("app.js 실행됨");


async function sendLocationBtn(position) {
  // 1. 위치 데이터 검증
  if (!position?.coords) {
    console.error("잘못된 위치 데이터", position);
    return { success: false, error: "Invalid position" };
  }

  // 2. 이메일 fallback 처리
  const email = localStorage.getItem("userEmail") || "cccijj@gmail.com";
  console.log("사용 이메일:", email);

  // 3. 전송 데이터 구성
  const payload = {
    email: email,
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    timestamp: new Date().toISOString()
  };

  try {
    console.log("전송 시작:", payload);
    const response = await fetch(WEB_APP_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    // 4. HTTP 오류 처리
    if (!response.ok) {
      throw new Error(`서버 오류: ${response.status}`);
    }

    const result = await response.json();
    console.log("전송 성공:", result);
    return result;

  } catch (error) {
    // 5. 에러 상세 로깅
    console.error("전송 실패 상세:", {
      message: error.message,
      stack: error.stack,
      payload: payload
    });
    throw error;
  }
}