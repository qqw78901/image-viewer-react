# ImageViewerReact

基于photoSwipe的图片预览插件--React版


## 组件使用

> npm install image-viewer-react -S

详见 examples/src

## API

名称 | 默认 | 意义
---- |  --- | ---- 
index | 0 | 打开时需要展示的图片索引
imgs | [] | 图片url
visible | - |  控制显示隐藏，使用方式一时该项不传
options | {}|  参考photoSwipe的option
onClose | - |  onClose

## 使用方式

### 方式一

外部控制组件生成和销毁

```javascript
    const { list, open, index } = this.state;
    {open && <ImageViewer 
    imgs={list} 
    index={index} 
    onClose={()=>{this.setState({open:false})}} 
    />

```` 


### 方式二

组件内部控制生成和销毁

```javascript 


    const { list, open, index } = this.state;
    <ImageViewer 
    visible={open} imgs={list} index={index} 
    onClose={()=>{this.setState({open:false})}}  />

````



## 组件开发

# 工程结构

```
├── LICENSE
├── README.md
├── dist                    // 产物外链版本
├── esm                     // 产物ES6版本
├── examples                // 示例代码
├── lib                     // 产物ES5正常版本
├── node_modules
├── package-lock.json
├── package.json
├── rollup.config.js
├── src                     // 源代码
├── style                   // 源代码样式
└── webpack.config.js
```

# 结构说明
- 产出三种格式的代码：
    + `dist`: 外链版本，通过`script`标签引入
    + `esm`: es6语法版本
    + `lib`: es5语法常用版本


