$(function () {

	var banner = {

		//保存图片容器
		imgContainer: [
			'banner3.png',
			'banner1.png',
			'banner2.png',
			'banner3.png'
		],

		//保存图片的索引
		list: 1,

		//保存定时器序号
		timer: null,

		//展示轮播图片宽度
		showWidth: $('#show').width(),

		//创建轮播图片
		createImage: function () {
			var $banner = $('#banner');
			var len = this.imgContainer.length;
			for (var i = 0; i < len; i++) {
				var li = $('<li><img src="./images/' + this.imgContainer[i] + '" /></li>');
				//在ul的结尾添加元素，图片多少个就添加多少个
				//append() 方法在被选元素的结尾（仍然在内部）插入指定内容。
				$banner.append(li);
			}
			//find() 方法获得当前元素集合中每个元素的后代，通过选择器、jQuery 对象或元素来筛选。
			// ul的子标签的长度是图片的宽度
			$banner.find('li').width(this.showWidth);

			// 那么ul的宽度就是所有li宽度的总和
			$banner.width(this.showWidth * len);

			//css() 方法设置或返回被选元素的一个或多个样式属性。
			$banner.css({left: -this.showWidth});

			// 那么轮播的下标索引就是图片的个数
			this.createIndex(len);

			return this;
		},

		//创建图片的索引
		createIndex: function (len) {
			for (var i = 0; i < len - 1; i++) {
				var li = $('<li class="' + (i == 0 ? 'on' : '') + '"></li>');
				$('#index').append(li);
			}
		},

		//索引切换图片
		toggleImageForIndex: function (t) {
			//hasClass() 方法检查被选元素是否包含指定的 class。
			if (t.hasClass('on')) {
				return;
			}
			//index() 方法返回指定元素相对于其他指定元素的 index 位置。
			var index = t.index();

			this.list = index + 1;
			//animate() 方法执行 CSS 属性集的自定义动画。
			//该方法通过CSS样式将元素从一个状态改变为另一个状态。CSS属性值是逐渐改变的，这样就可以创建动画效果。
			$('#banner').animate({left: -this.showWidth * this.list});
			//:eq() 选择器选取带有指定 index 值的元素。
			//index 值从 0 开始，所有第一个元素的 index 值是 0（不是 1）。
			//addClass() 方法向被选元素添加一个或多个类。
			//siblings() 获得匹配集合中每个元素的同胞，通过选择器进行筛选是可选的。
			$('#index>li').eq(this.list - 1).addClass('on').siblings().removeClass('on');
		},//siblings().removeClass('on');移除兄弟中的class属性

		//切换上一张图片
		previousImage: function () {
			var $banner = $('#banner');

			// 如果字符串的一个字符是数字，那么parseFloat就可以把它变换成数字
			var left = parseFloat($banner.css('left'));
			if (!this.validBannerLeft(left)) {
				return;
			}

			if (left >= 0) {
				$banner.css({left: -this.showWidth * (this.imgContainer.length - 1)});
				// 如果left大于0的话，那么ul样式就向左移动一个图片

				this.list = this.imgContainer.length - 2;
				// 那么他的下标索引就要减去2个
			} else {
				this.list--;
			}

			$banner.animate({left: -this.showWidth * this.list});
			// banner的动画效果就是图片的宽度就是他的小标索引的倍数
			$('#index>li').eq(this.list - 1).addClass('on').siblings().removeClass('on');
			// 一个当前执行的类，并获取他的同胞元素，执行下一个同胞元素的时候就赋予这个类
		},

		//切换下一张图片
		nextImage: function () {
			var $banner = $('#banner');
			var left = parseFloat($banner.css('left'));
			if (!this.validBannerLeft(left)) {
				return;
			}
			if (left <= -this.showWidth * (this.imgContainer.length - 1)) {
				$banner.css({left: 0});
				this.list = 1;
			} else {
				this.list++;
			}

			$banner.animate({left: -this.showWidth * this.list});
			$('#index>li').eq(this.list - 1).addClass('on').siblings().removeClass('on');
		},

		//验证banner的left
		validBannerLeft: function (left) {
			if (left % this.showWidth == 0) {
				return true;
			}
			return false;
		},

		//绑定切换图片事件
		addEvent: function () {
			var self = this;
			$('#show').on({'click': function () {
				var $this = $(this);
				var id = $this.attr('id');
				if (id === 'prev') {
					//上一张
					self.previousImage();
				} else if (id === 'next') {
					//下一张
					self.nextImage();
				} else {
					//索引切换
					self.toggleImageForIndex($this);
				}

			}}, '#prev,#next,#index>li').hover(function () {
				self.cancelAutoPlay();
				$('#prev,#next,#index>li').fadeIn(300);

			}, function () {
				self.autoPlay();
				$('#prev,#next,#index>li').fadeOut(300);
			})

			return self;
		},

		//自动轮播
		autoPlay: function () {
			var self = this;
			self.timer = setInterval(function () {
				self.nextImage();
			}, 2000);
		},

		//取消自动轮播
		cancelAutoPlay: function () {
			clearInterval(this.timer);
			this.timer = null;
		},


		//初始化页面
		initPage: function () {
			this.createImage().addEvent().autoPlay();
		}


	};

	banner.initPage();

});