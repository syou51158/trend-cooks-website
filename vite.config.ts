import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import fs from "fs"

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-trend-order-images',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url || '';
          
          // /menu-images/, /drink-images/, /beer-images/ へのリクエストを検出
          const match = url.match(/^\/(menu-images|drink-images|beer-images)\/([^?#]+)/);
          
          if (match) {
            const bucket = match[1];
            const filename = match[2];
            // 隣接する Trend Order プロジェクトの public ディレクトリ内の画像パス
            const trendOrderImagePath = path.resolve(__dirname, `../Trend Order/public/${bucket}/${filename}`);
            
            if (fs.existsSync(trendOrderImagePath)) {
              const ext = path.extname(trendOrderImagePath).toLowerCase();
              let contentType = 'image/jpeg';
              if (ext === '.png') contentType = 'image/png';
              else if (ext === '.svg') contentType = 'image/svg+xml';
              else if (ext === '.gif') contentType = 'image/gif';
              
              res.setHeader('Content-Type', contentType);
              res.end(fs.readFileSync(trendOrderImagePath));
              return;
            }
          }
          next();
        });
      }
    }
  ],
  base: '/',
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})


