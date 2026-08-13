<h1 align="center">
  <img src="./logos/logo.png" width="144px" alt="天神语录生成器 Logo" />
  <div>天神语录生成器</div>
</h1>

![Version](https://img.shields.io/static/v1?label=Version&message=1.0.0&color=blue)
[![License](https://img.shields.io/static/v1?label=License&message=MIT&color=green)](./LICENSE.txt)
![Creator](https://img.shields.io/static/v1?label=Creator&message=doctypehtml&color=red)

天神语录生成器是一个用于生成像 Antimatter Dimensions 中天神语录的对话框的应用.

## 主要特性

支持为喜欢的角色生成像 Antimatter Dimensions 中天神的语录一样的对话框，可自定义的项目包括：

- 名字
- 主题色
- 语录内容
- 对话框背景
- 按钮

## 应用链接

[https://doclove2generatename.netlify.app/#/](https://doclove2generatename.netlify.app/#/)

## 做点贡献

### 1. 获取源代码

#### 直接下载

点击 Code -> Download ZIP -> 解压文件

#### 克隆仓库

HTTPS：`git clone https://github.com/docccccccccccc/CelestialQuoteNew.git`

SSH：`git clone git@github.com:docccccccccccc/CelestialQuoteNew.git`

### 2. 准备工作

- 打开项目目录
- 在项目目录打开终端
- 输入 `pnpm install`
- 等待安装完毕，输入 `pnpm dev` 启动开发服务器

### 3. 编辑代码

## 项目结构

```
incremental-gamer-name-generator/
├─ .vscode/           VSCode 编辑器设置
├─ .editorconfig
├─ .oxlintrc.json     Oxlint 配置
├─ .prettierrc.json   Prettier 配置
├─ env.d.ts
├─ eslint.config.ts   ESLint 配置
├─ index.html         入口文件
├─ logo/             项目 Logo，用于 README
│  └─ logo.png        项目 Logo
├─ pnpm-lock.yaml     项目依赖、脚本配置
├─ package.json       项目依赖、脚本配置
├─ public/            静态资源
│  └─ favicon.ico     网站图标
├─ README.md          README（你正在看的）
├─ src/               源代码
│  ├─ App.vue         根组件
│  ├─ components/     页面内组件
│  ├─ main.ts         项目入口文件
│  ├─ styles/         页面样式
│  ├─ utils/
│  ├─ assets/         网页资源
│  └─ consts/         使用的常量
├─ tsconfig.app.json  TypeScript 配置
├─ tsconfig.json      TypeScript 配置
├─ tsconfig.node.json TypeScript 配置
├─ vite.config.ts     Vite 配置
└─ .gitignore         Git 提交忽略配置
```

## 问题反馈

你可以通过发 [Issues](https://github.com/docccccccccccc/CelestialQuoteNew/issues) 进行反馈.

## 许可证

本应用使用 MIT 许可证，详见 [LICENSE.txt](./LICENSE.txt) 文件.

## 法律信息

本应用使用了 MiSans 字体和 MonospaceTypewriter 字体。
MiSans 是小米科技有限责任公司设计的字体，版权归其所有。
MonospaceTypewriter 是 Manfred Klein 设计的字体，版权归其所有。

对于 MonospaceTypewriter 字体，由于字体本身的许可证要求，应用本身并未提供。
如果你需要此字体以获得更还原的视觉体验，请自行下载并安装此字体。

《Antimatter Dimensions》是由 [Hevipelle](https://github.com/IvarK) 开发的一款增量游戏。

> This app uses 2 typefaces: MiSans and MonospaceTypewriter.
> MiSans is a typeface designed by Xiaomi Corporation, with all rights reserved.
> MonospaceTypewriter is a monospaced typeface designed by Manfred Klein, with all rights reserved.
>
> As for typeface MonospaceTypewriter, due to license requirements of this typeface, this application didn't provide this typeface.
> If you need this typeface to get better visual experience, please download and install it manually.
>
> _Antimatter Dimensions_ is a incremental game developed by [Hevipelle](https://github.com/IvarK).
