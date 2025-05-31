// 設定頁面的 metadata，包括標題與描述
export const metadata = {
  title: 'Todo List',          // 網頁標題
  description: '我的代辦清單',  // 網頁描述，通常用於 SEO 與社群分享
};

// 預設輸出 RootLayout 元件，負責包覆整個頁面內容
export default function RootLayout({
  children,                    // 傳入的子元件（頁面內容）
}: {
  children: React.ReactNode;   // 定義 children 的型別為 React 節點
}) {
  return (
    // HTML 根標籤，設定語言為繁體中文（台灣）
    <html lang="zh-Hant">
      {/* head 元素，Next.js 會自動插入標題、meta 等 */}
      <head />
      {/* body 元素，實際呈現的內容是傳入的 children 元件 */}
      <body>{children}</body>
    </html>
  );
}
