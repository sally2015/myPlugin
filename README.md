show为原生js+css3单页面效果，效果类似于fullpage.js,不过这里完全使用原生js实现，不依赖jq


validation是根据公司业务专门开发的一个表单验证插件，使用原生js实现了常用的验证方法，利用面向对象的设计模式，不依赖于其他组件，轻巧简便。

layer是为公司常用的弹出框封装的一个简易版的layer插件，利用了单例模式。

mytool是项目中常用的方法，不用单独封装



Carousel.js轮播插件在需轮播的父节点加入类.carousel，控制列表加入.dot
执行new Carousel（options）
options{
    delay:轮播时长，默认3000，
    eventWay：控制列表的触发事件，默认为mouseover，
    moveWay：opacity,vertical,horizontal,表示轮播方式
    }
    
    示例：
    <ul class="carousel">
						<li>
							<a herf="#">
								<img src="img/index_nav_bg1.jpg">
							</a>
						</li>
						<li>
							<a herf="#">
								<img src="img/index_nav_bg2.jpg">
							</a>
						</li>
						<li>
							<a herf="#">
								<img src="img/index_nav_bg3.jpg">
							</a>
						</li>
						<li>
							<a herf="#">
								<img src="img/index_nav_bg4.jpg">
							</a>
						</li>
						<li>
							<a herf="#">
								<img src="img/index_nav_bg5.jpg">
							</a>
						</li>
					<ul class="dot">
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li class="active"></li>
					</ul>
				</ul>
    
