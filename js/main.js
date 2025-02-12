// 控制展開區塊的功能
function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  const container = document.querySelector('.container');
  const video = document.getElementById("m_video");

  // 處理影片播放
  handleVideoPlayback(video);
  
  // 處理展開/收起邏輯
  if (section.classList.contains("open")) {
    closeSection(section, container);
  } else {
    openSection(section, container);
  }
}

// 處理影片播放邏輯
function handleVideoPlayback(video) {
  if (!video.paused) {
    video.pause();
    video.currentTime = 0;
  }
}

// 收起區塊
function closeSection(section, container) {
  section.classList.remove("open");
  container.classList.remove("shift-down");
}

// 展開區塊
function openSection(section, container) {
  // 關閉其他已展開的區塊
  document.querySelectorAll('.expandable').forEach(sec => sec.classList.remove("open"));
  
  section.classList.add("open");
  container.classList.add("shift-down");
}

// 初始化頁面事件
document.addEventListener("DOMContentLoaded", function () {
  initializeNavigationButtons();
  initializeActionButtons();
});

// 初始化導航按鈕
function initializeNavigationButtons() {
  // 首頁按鈕
  document.getElementById("home-btn").addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelectorAll('.expandable').forEach(sec => sec.classList.remove("open"));
    document.querySelector('.container').classList.remove("shift-down");
  });

  // 聯絡我們按鈕
  document.getElementById("contact-btn").addEventListener("click", function(e) {
    e.preventDefault();
    toggleSection("contact");
  });

  // 關於我們按鈕
  document.getElementById("about-btn").addEventListener("click", function(e) {
    e.preventDefault();
    toggleSection("about");
  });
}

// 初始化操作按鈕
function initializeActionButtons() {
  const appBtn = document.getElementById("APP");
  const getStartedBtn = document.getElementById("get-started-btn");
  const urls = {
    register: "https://vctegwbqj.com/registrations/new?code=WC9QF7",
    ios: "https://vctegwbqj.com/investor",
    android: "https://vctegwbqj.com"
  };

  // 註冊按鈕事件
  getStartedBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = urls.register;
  });

  // APP按鈕事件
  appBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const finalLink = detectDeviceAndGetLink(urls);
    console.log("✅ `appBtn` 被點擊，將跳轉到:", finalLink);
    window.location.href = finalLink;
  });
}

// 檢測設備類型並返回對應鏈接
function detectDeviceAndGetLink(urls) {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    console.log("✅ 檢測到 iOS 設備");
    return urls.ios;
  } 
  
  if (/android/i.test(userAgent)) {
    console.log("✅ 檢測到 Android 設備");
    return urls.android;
  }
  
  return urls.ios; // 預設返回 iOS 鏈接
}