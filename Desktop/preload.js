const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  LOGIN: process.env.API_URL + process.env.API_LOGIN
});

const string = (() => {
  const value = {
    vi: {
      missingInput: "Vui lòng nhập đầy đủ tài khoản và mật khẩu.",
      loginSuccess: "Đăng nhập thành công!",
      loginFail: "Đăng nhập thất bại.",
      loginError: "Có lỗi xảy ra. Vui lòng thử lại.",
      sendingLoginRequest: "Gửi yêu cầu đăng nhập đến: ",
    },
    en: {
      missingInput: "Please enter both username and password.",
      loginSuccess: "Login successful!",
      loginFail: "Login failed.",
      loginError: "An error occurred. Please try again.",
      sendingLoginRequest: "Sending login request to: ",
    }
  };

  function getLangCode() {
    const lang = navigator.language || 'en';
    if (lang.startsWith('vi')) return 'vi';
    if (lang.startsWith('en')) return 'en';
    return 'en';
  }

  const currentLang = getLangCode();

  function text(key) {
    return value[currentLang][key] || value['en'][key] || key;
  }

  return { text, currentLang };
})();

contextBridge.exposeInMainWorld('string', string);