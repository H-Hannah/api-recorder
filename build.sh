#!/bin/bash
# 构建脚本 - 解决Node.js 18 OpenSSL问题

echo "开始构建API-RECORDER项目..."

# 设置环境变量解决OpenSSL问题
export NODE_OPTIONS="--openssl-legacy-provider"

# 清理之前的构建
if [ -d "dist" ]; then
    echo "清理之前的构建文件..."
    rm -rf dist
fi

# 运行构建
echo "运行Vue CLI构建..."
npx vue-cli-service build

if [ $? -eq 0 ]; then
    echo "✅ 构建成功！"
    echo "📁 构建文件位于 dist/ 目录"
    ls -la dist/
else
    echo "❌ 构建失败！"
    exit 1
fi
