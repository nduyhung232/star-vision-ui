# Sử dụng image Node.js chính thức để build
FROM node:18 as build

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng Vue 3
RUN npm run build

# Sử dụng Nginx làm web server
FROM nginx:1.23

# Sao chép file build từ image build vào Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose cổng 80 để truy cập ứng dụng
EXPOSE 80

# Chạy Nginx
CMD ["nginx", "-g", "daemon off;"]