# Clipboard.js

一个实现常用的点击后复制/剪切功能的轻量库，不依赖 Flash！

## 用法
1. 引入 `clipboard.js`
    ```html
    <script src="./clipboard.min.js"></script>
    ```

2. 提供按钮、必要的目标元素以及相关 `data` 属性
    ```html
    // 组合1：按钮 + 普通目标元素
    <div id="context">
        测试
    </div>
    <input class="clipboard-btn" data-clipboard-target="#context" data-clipboard-action="copy" type="button" value="复制">
    
    // 组合2：按钮 + 表单输入控件
    <textarea id="textarea">
        那才是你福星高照的時候，的本領，你已經去了不再回來，去時自去：正如你生前我不知欣喜，知道你，直到你的影像活現在我的眼前，你可以拿一條這邊顏色的長巾包在你的頭上，說你在坐車裏常常伸出你的小手在車欄上跟著音樂按拍；你稍大些會得淘氣的時候，你應得躲避她像你躲避青草裡一條美麗的花蛇！
    </textarea>
    <input class="clipboard-btn" data-clipboard-target="#textarea" data-clipboard-action="cut" type="button" value="剪切">
    ```
    按钮的 `data-clipboard-target` 指定需要复制/剪切内容所在的元素 id，`data-clipboard-action` 指定采取何种操作：`copy`, `cut`。

3. 在页面加载完毕后进行 Clipboard 初始化，一次性为同一类名的按钮添加点击-赋值/剪切的功能。
    ```javascript
    var clipboardList = Clipboard.init('clipboard-btn');
    // 同时 clipboardList 指向我们所有 clipboard 对象的数组，会动态更新
    ```
    `Clipboard.init()` 接收一个类名，这样就为所有该类名的 DOM 绑定了点击事件。

4. 你也可以单独为某个按钮（当然按钮元素必须是有 2 中的 `data` 属性的）添加点击-复制/剪切的功能
    ```javascript
    // 传入选择器字符串
    var clipboard = new Clipboard('queryStr');
 
    // 直接传入元素
    var clipboard = new Clipboard(ele);
    ```

5. 你可以对 `clipboard` 对象使用观察者模式，现支持两种事件：`success` 和 `error`
    ```javascript
    var callback = function(e) {
       console.error(e.action);
       console.error(e.trigger);
       console.error(e.target);
    };
 
    clipboard.on('success', callback);
    
    ```
    回调函数（callback）会自动传入两个参数：`clipboard` 对象与事件字符串（`success` 与 `error`）。
6. 停止某个按钮的点击-复制/剪切功能
    ```
    clipboard.destroy();
    ```
