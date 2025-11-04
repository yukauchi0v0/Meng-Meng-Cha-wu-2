/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',                // 靜態輸出
  basePath: '/Meng-Meng-Cha-wu-2', // repository 名稱
  trailingSlash: true,             // URL 結尾加斜線
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
}

export default nextConfig
