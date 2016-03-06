show为原生js+css3单页面效果




mytool为总结和归纳的插件方法



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
    
