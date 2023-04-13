let baseUrl = "",
  url = "";
if (process.env.NODE_ENV === "production") {
  // 生产环境
  url = "https://nplusbox.com";
  baseUrl = "https://api.nplusbox.com/v1/";
} else {
  // 开发环境
  url = "https://stg.nplusbox.com";
  baseUrl = "https://stg-api.nplusbox.com/v1/";
}

export { url, baseUrl };
