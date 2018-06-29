## Day01-项目开发流程

### 2.1 创建客户端项目

####  2.1.1 使用 vue-cli(脚手架)搭建项目 

```bash
#在Github新建Vue-MintShop项目,然后clone到本地
git clone git@github.com:W-Qing/Vue-MintShop.git
cd Vue-MintShop
#创建客户端项目
vue init webpack mintshop-client
cd mintshop-client
npm install
npm run dev 访问: localhost:8080
```

#### 2.1.2 项目结构分析 

> MintShop-client
>
> ​	|-- build : webpack 相关的配置文件夹(基本不需要修改) 
>
> ​	|-- config: webpack 相关的配置文件夹(基本不需要修改)
>
> ​	|-- index.js: 指定的后台服务的端口号和静态资源文件夹 
>
> ​	|-- node_modules 
>
> ​	|-- src : 源码文件夹 
>
> ​	|-- main.js: 应用入口 js
>
> ​	|-- static: 静态资源文件夹
>
> ​	|-- .babelrc: babel 的配置文件 
>
> ​	|-- .editorconfig: 通过编辑器的编码/格式进行一定的配置 
>
> ​	|-- .eslintignore: eslint 检查忽略的配置
>
> ​	|-- .eslintrc.js: eslint 检查的配置 
>
> ​	|-- .gitignore: git 版本管理忽略的配置 
>
> ​	|-- index.html: 主页面文件
>
> ​	|-- package.json: 应用包配置文件
>
> ​	|-- README.md: 应用描述说明的 readme 文件 

#### 2.1.3 编码测试与打包发布项目  

- 编码测试 

  npm run dev 

  访问: http://localhost:8080 

  编码, 自动编译打包(HMR), 查看效果 

- 打包发布 

  npm run build 

  npm install -g serve 

  serve dist

  访问: http://localhost:5000  

### 2.2 功能需求分析

### 2.3 开发资源准备

