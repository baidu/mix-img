export PATH=$NODEJS_BIN_LATEST:$PATH

echo "node: $(node -v)"
echo "npm: $(npm -v)"


out_dir="output"

# 安装依赖
export NODE_ENV=development
npm install

# 跑一遍build
export NODE_ENV=production
npm run build


mkdir -p $out_dir
mv ./dist $out_dir
if [ $? -eq 0 ]; then
    echo '[publish] done'
    exit 0
else
    echo '[publish] fail'
    exit 1
fi
