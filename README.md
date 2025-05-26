# Cursor 纪念币 H5 展示页面

一个基于 React + TypeScript + Three.js 开发的 H5 纪念币展示页面，专为移动端优化，通过二维码扫描访问。

## 🌟 功能特点

- **3D 纪念币展示**: 使用 Three.js 实现精美的 3D 纪念币模型，支持旋转和悬浮动画
- **响应式设计**: 完全适配移动端 H5 页面，支持触摸操作
- **智能稀有度系统**: 根据序号自动判定纪念币稀有度（传奇、史诗、稀有、普通）
- **URL 参数解析**: 通过 6 位数密钥确定具体的纪念币
- **优雅的 UI 设计**: 渐变背景、粒子效果、动画等现代化 UI 元素
- **PWA 支持**: 支持离线访问和添加到主屏幕

## 🎨 稀有度等级

| 稀有度 | 概率 | 颜色 | 说明                 |
| ------ | ---- | ---- | -------------------- |
| 传奇   | 4%   | 金色 | 随机分布的传奇纪念币 |
| 普通   | 96%  | 银色 | 标准纪念币           |

### 传奇纪念币分布

传奇纪念币在各个序号段中随机分布：

- 1-100 段：10 枚传奇纪念币
- 100-1000 段：10 枚传奇纪念币
- 1000-10000 段：10 枚传奇纪念币
- 10000+段：10 枚传奇纪念币

## 🚀 快速开始

### 安装依赖

```bash
npm install --legacy-peer-deps
```

### 启动开发服务器

```bash
npm start
```

### 构建生产版本

```bash
npm run build
```

## 📱 使用方法

### URL 格式

```
https://your-domain.com?key=000001
```

其中 `key` 参数必须是 6 位数字，例如：

- `?key=000001` - 传奇纪念币 #1
- `?key=000500` - 史诗纪念币 #500
- `?key=005000` - 稀有纪念币 #5000
- `?key=050000` - 普通纪念币 #50000

### 二维码生成示例

可以使用任何二维码生成器创建包含 URL 的二维码，用户扫描后即可查看对应的纪念币。

## 🛠 技术栈

- **React 18** - 前端框架
- **TypeScript** - 类型安全
- **Three.js** - 3D 图形渲染
- **@react-three/fiber** - React Three.js 集成
- **@react-three/drei** - Three.js 辅助组件库
- **styled-components** - CSS-in-JS 样式方案
- **React Router** - 路由管理

## 📦 项目结构

```
src/
├── components/          # 组件目录
│   ├── Coin3D.tsx      # 3D纪念币组件
│   └── CoinInfo.tsx    # 纪念币信息展示组件
├── pages/              # 页面目录
│   └── CoinDisplay.tsx # 主展示页面
├── utils/              # 工具函数
│   └── index.ts        # URL解析和数据生成
├── App.tsx             # 主应用组件
└── index.tsx           # 应用入口
```

## 🎯 核心功能

### 1. 3D 纪念币渲染

- 圆柱形硬币几何体
- 金属质感材质
- 正反面文字渲染
- 旋转和悬浮动画
- 鼠标悬停效果

### 2. 稀有度系统

- 基于序号的自动稀有度判定
- 不同稀有度对应不同颜色和特效
- 光环效果增强视觉表现

### 3. 移动端优化

- 触摸手势支持
- 响应式布局
- 性能优化
- 禁用不必要的交互

## 🔧 自定义配置

### 修改稀有度规则

在 `src/utils/index.ts` 中的 `generateCoinData` 函数内修改：

```typescript
if (keyNum <= 100) {
  rarity = 'legendary';
  // 自定义传奇纪念币范围
}
```

### 修改 3D 模型

在 `src/components/Coin3D.tsx` 中调整几何体参数：

```typescript
<cylinderGeometry args={[2, 2, 0.3, 32]} />
// [radius, radius, height, segments]
```

### 修改颜色主题

在组件的 `getRarityColor` 函数中修改颜色配置。

## 📱 移动端测试

1. 启动开发服务器
2. 使用 ngrok 或类似工具暴露本地端口
3. 生成测试 URL 的二维码
4. 用手机扫描测试

## 🚀 部署

### Vercel 部署

```bash
npm run build
# 上传 build 目录到 Vercel
```

### Netlify 部署

```bash
npm run build
# 上传 build 目录到 Netlify
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！

---

**注意**: 此项目仅用于展示目的，请确保遵守相关法律法规。
