/*
//展示阅读全文
$('.mp-article-content-more-wrap').click(function () {
    $('.mp-article-images').show();
    $('.mp-article-texts').show();
    $(this).hide();
});
//关注
$('.mp-author-link-hand').click(function () {
    alert('功能尚未开通，后期完善。敬请你的期待！')
});
//解决音乐自动播放
/!*$(document).ready(function () {
    $('html').one('touchstart',function(){
        audio.play();
        $('.mp-article-music-static-hand i').addClass('mp-article-music-static-pause').removeClass('mp-article-music-static-play')
    });
});*!/

//控制音乐按钮的显示或隐藏
$(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() > 500) {
            $('.mp-article-music-migu-fixed').show();
        } else {
            $('.mp-article-music-migu-fixed').hide();
        }
    });
});

//控制音乐播放或暂停
 $('.mp-article-music-migu-fixed').click(function () {
     if(audio.paused) {
         $(this).addClass('animation');
         $('.mp-article-music-static-hand i').addClass('mp-article-music-static-pause').removeClass('mp-article-music-static-play');
         audio.play();
     } else {
         $(this).removeClass('animation');
         $('.mp-article-music-static-hand i').addClass('mp-article-music-static-play').removeClass('mp-article-music-static-pause');
         audio.pause();
     }
 });
//输入框
$('.comment-input').focus(function () {
    $('.mp-article-foots').show();
    $('.mp-article-foot').hide();
});
//点击发送
$('.input-send').click(function () {
    $('.mp-article-foot').show();
    $('.mp-article-foots').hide();
});
*/

 let  comment = new Vue({
    el: '#app',
    data: {
        //数据类型
        dataType:null,
        //用户信息
        userInformation:[],
        //文章内容
        articleContent:[],
        //推荐列表
        articleList:[],
        //评论列表
        commentList:[],
        //歌曲信息
        musicInformation:[],
        //歌曲名称
        musicName:'',
        //控制展开阅读全文
        isHidden:true,
        loader:true,
        //文章id
        articleID:'',
        articleToken:'',
        //特效
        specialEffects:'',
        //当前页和总页数
        totalPage:1,
        totalCount:null,
        loaderMore:false,
        //是否点赞
        doYouLike:false,
        collectionshow:'',
    },

    mounted() {
        //初始化数据
        this.init();
        //获取评论列表
        this.getCommentList();
    },
    methods: {
        init: function () {
            let self = this;
            $.post('https://api.songfuniaops.com/article/ajax-detail', {
               /* token: 'tAOXebNMDdp5Q3YUiLNXwi31PeAIJQsHZBLW6oOe',*/
                token: self.articleToken,
                article_id: self.articleID ,
            }, function (res) {
                if(res.code == 200){
                    if(res.data.type == 1){
                        self.dataType = res.data.type;
                        self.userInformation = res.data.data;
                        self.articleList = res.data.data.article_list;
                        self.musicInformation = res.data.data.music;
                        self.musicName = res.data.data.music.music;
                        // self.commentList = res.data.data.comment;
                        self.articleContent = res.data.data.content;
                        self.specialEffects = res.data.data.tag;
                    }else if(res.data.type == 3 || res.data.type == 2){
                        self.dataType = res.data.type;
                        self.userInformation = res.data.data.info;
                        self.musicName = res.data.data.info.music;
                        self.collectionshow =  res.data.data.is_collect;
                        // self.commentList = res.data.data.comment;
                        self.articleList = res.data.data.article_list;
                    }

                    setTimeout(function () {
                        self.loader = false;
                    },600);
                   /* self.specialEffects = "autumnScenery";*/
                    self.$nextTick(function () {
                        if(self.specialEffects == "flower"){
                            // tbaNumber(1);
                            $('.mp-article-bgfixed').css("background-image","url(image/1/bg1.png)");
                            $('.mp-article').css("background-color","rgba(77, 127, 128,.4)");
                        }else if(self.specialEffects == "petal"){
                            // tbaNumber(2);
                            $('.mp-article-bgfixed').css("background-image","url(image/2/bg1.png)");
                            $('.mp-article').css("background-color","#dae1f4");
                        }else if (self.specialEffects == "dandelion"){
                            // tbaNumber(3);
                            $('.mp-article-bgfixed').css("background-image","url(image/3/bg1.png)");
                            $('.mp-article').css("background-color","rgba(98, 124, 112,.4)");
                        }else if(self.specialEffects == "forget"){
                            // tbaNumber(4);
                            $('.mp-article-bgfixed').css("background-image","url(image/img0/bg1.png)");
                            $('.mp-article').css("background-color","rgba(214, 199, 255,.4)");
                        }else if (self.specialEffects == "cherryBlossoms"){
                            // tbaNumber(5);
                            $('.mp-article-bgfixed').css("background-image","url(image/img/bg1.png)");
                            $('.mp-article').css("background-color","rgba(254, 222, 227,.2)");
                        } else if(self.specialEffects == "autumnScenery"){
                            // tbaNumber(6);
                            $('.mp-article-bgfixed').css("background-image","url(image/img2/bg1.png)");
                            $('.mp-article').css("background-color","rgba(255, 240, 197,.4)");
                        }else if (self.specialEffects == "sunFlower"){
                            // tbaNumber(7);
                            $('.mp-article-bgfixed').css("background-image","url(image/img3/bg1.png)");
                            $('.mp-article').css("background-color","rgba(189, 229, 187,.2)");
                        }
                        else if (self.specialEffects == "whiteDandelion"){
                            // tbaNumber(8);
                            $('.mp-article-bgfixed').css("background-image","url(image/img4/bg1.png)");
                            $('.mp-article').css("background-color","rgba(151, 184, 145,4)");
                        }
                        self.getAutoPlay();
                        self.musicPlay();
                    })

                }
            });

           /* setInterval(function () {
                self.getCommentList();
            },1000 * 30)*/
        },

        //获取评论列表
        getCommentList:function () {
            let self = this;
            if(self.articleToken){
                $.post('https://api.songfuniaops.com/article/comments-list', {
                    /* token: 'tAOXebNMDdp5Q3YUiLNXwi31PeAIJQsHZBLW6oOe',*/
                    token: self.articleToken,
                    p: self.totalPage,
                    article_id: self.articleID ,
                }, function (res) {
                    if(res.code == 200){
                        self.totalPage = res.data.pages.total_page;
                        self.totalCount = res.data.pages.total_count;
                        self.commentList = res.data.list;
                        if(self.totalCount > self.totalPage ){
                            self.loaderMore = true;
                        }

                    }
                });
            }else {
                $.post('https://api.songfuniaops.com/article/comments-list', {
                    p: self.totalPage,
                    article_id: self.articleID ,
                }, function (res) {
                    if(res.code == 200){
                        self.totalPage = res.data.pages.total_page;
                        self.totalCount = res.data.pages.total_count;
                        self.commentList = res.data.list;
                        if(self.totalCount > self.totalPage ){
                            self.loaderMore = true;
                        }

                    }
                });
            }

        },

        musicPlay:function () {
            let self = this;
            let playerTrack = $("#player-track"),
                playPauseButton = $(".mp-article-music-static"),
                curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0,  tFlag = false,
                albumArtworks = ['_1'], trackUrl = [self.musicName],  currIndex = -1;
            //播放音乐
            function playPause() {
                $('.mp-article-music-static-hand i').addClass('mp-article-music-static-pause').removeClass('mp-article-music-static-play');
                setTimeout(function() {
                    if(audio.paused) {
                        audio.play();
                    } else {
                        $('.mp-article-music-static-hand i').addClass('mp-article-music-static-play').removeClass('mp-article-music-static-pause');
                        audio.pause();
                    }
                },300);
            }

            function selectTrack(flag) {
                if( flag == 0 || flag == 1 )
                    ++currIndex;
                else
                    --currIndex;
                if( (currIndex > -1) && (currIndex < albumArtworks.length) ) {
                    audio.src = trackUrl[currIndex];
                    nTime = 0;
                    bTime = new Date();
                    bTime = bTime.getTime();
                    if(flag != 0) {
                        audio.play();
                    }
                } else {
                    if( flag == 0 || flag == 1 )
                        --currIndex;
                    else
                        ++currIndex;
                }
            }

            function initPlayer() {
                audio = new Audio();
                selectTrack(0);
                audio.loop = false;
                //控制音乐播放
                playPauseButton.on('click',playPause);
            }
            initPlayer();
        },
        //点赞功能
        givFabulous:function (id,todo) {
            let self = this;
            todo.zan_num = ++todo.zan_num;
            todo.is_zan = true;
            let transfer_key = 'ead5de99e3dfe933ef56bd2ff6e08886';
            let parameter= sha1(('comments_id='+id)+transfer_key);
            $.post('https://api.songfuniaops.com/article/comments-zan', {
                token: self.articleToken,
                comments_id: id,
                sign: parameter,
            }, function (res) {
                if(res.code == 200){

                    // self.getCommentList();
                }
            });

        },
        //取消点赞
        cancelPoints:function (id,todo) {
            let self = this;
            todo.zan_num = --todo.zan_num;
            todo.is_zan = false;
            let transfer_key = 'ead5de99e3dfe933ef56bd2ff6e08886';
            let parameter= sha1(('comments_id='+id)+transfer_key);
            console.log(111111111,parameter)
            $.post('https://api.songfuniaops.com/article/delete-comments-zan', {
                token: self.articleToken,
                comments_id: id,
                sign: parameter,
            }, function (res) {
                if(res.code == 200){
                    // self.getCommentList();
                }
            });
        },
        //点击关注
        clickAttention:function (id) {
            let self = this;
            let user_id = id;
            // window.location.hash = "#comments";
             //判断设备型号
             let ua = navigator.userAgent.toLowerCase();
             //Android终端
             let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
             //Ios终端
             let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
             if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                 //Ios
                 let data = {user_id:user_id};
                 window.webkit.messageHandlers.follow.postMessage(data);
                 self.userInformation.is_follow = 1;
             } else if (/(Android)/i.test(navigator.userAgent)) {
                 //Android终端
                 android.follow(user_id);
                 self.userInformation.is_follow = 1;
             }
        },
        //文章投诉
        reportArticle:function(id){
            let article_id = id;
            //判断设备型号
            let ua = navigator.userAgent.toLowerCase();
            //Android终端
            let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
            //Ios终端
            let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                //Ios
                var data = {article_id:article_id};
                window.webkit.messageHandlers.report.postMessage(data);
            } else if (/(Android)/i.test(navigator.userAgent)) {
                //Android终端
                android.report(article_id);
            }

        },
        //收藏文章
        collectionArticles:function (id) {
            let self = this;
            let article_id = id;
            // window.location.hash = "#comments";
            //判断设备型号
            let ua = navigator.userAgent.toLowerCase();
            //Android终端
            let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
            //Ios终端
            let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                //Ios
                let data = {article_id:article_id};
                window.webkit.messageHandlers.collect.postMessage(data);
                self.userInformation.is_collect = 1;
                self.collectionshow = 1;
            } else if (/(Android)/i.test(navigator.userAgent)) {
                //Android终端
                android.collect(article_id);
                self.userInformation.is_collect = 1;
                self.collectionshow = 1;
            }
        },
        //取消收藏文章
        cancelCollection:function (id) {

            let self = this;
            let article_id = id;
            //判断设备型号
            let ua = navigator.userAgent.toLowerCase();
            //Android终端
            let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
            //Ios终端
            let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                //Ios
                let data = {article_id:article_id};
                window.webkit.messageHandlers.collect_cancel.postMessage(data);
                self.collectionshow = 0;
                self.userInformation.is_collect = 0;
            } else if (/(Android)/i.test(navigator.userAgent)) {
                //Android终端
                android.collect_cancel(article_id);
                self.collectionshow = 0;
                self.userInformation.is_collect = 0;
            }
        },
        //自动播放音乐
        getAutoPlay:function () {
            $(document).ready(function () {
                $('html').one('touchstart',function(){
                    audio.play();
                    $('.mp-article-music-migu-fixed').addClass('animation');
                    $('.mp-article-music-static-hand i').addClass('mp-article-music-static-pause').removeClass('mp-article-music-static-play')
                });
            })

        },
        //点击播放音乐
        broadcast:function () {
            let self = this;
            // self.musicPlay();
            if(audio.paused) {
                $('.mp-article-music-migu-fixed').addClass('animation');
                $('.mp-article-music-static-hand i').addClass('mp-article-music-static-pause').removeClass('mp-article-music-static-play');
                audio.play();
            } else {
                $('.mp-article-music-migu-fixed').removeClass('animation');
                $('.mp-article-music-static-hand i').addClass('mp-article-music-static-play').removeClass('mp-article-music-static-pause');
                audio.pause();
            }

        },
        //展开阅读全文
        loadMore:function () {
            this.isHidden = !this.isHidden;
        },
        //上滑加载更多
        touchStart (e) {
            this.startY = e.targetTouches[0].pageY
        },
        touchMove (e) {
            if (e.targetTouches[0].pageY < this.startY) { // 上拉
                if(this.loadMore){
                    this.judgeScrollBarToTheEnd()
                }
            }
        },
        // 判断滚动条是否到底
        judgeScrollBarToTheEnd () {
            let innerHeight = document.querySelector('.active').clientHeight
            // 变量scrollTop是滚动条滚动时，距离顶部的距离
            let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
            // 变量scrollHeight是滚动条的总高度
            let scrollHeight = document.documentElement.clientHeight || document.body.scrollHeight
            // 滚动条到底部的条件
            if (scrollTop + scrollHeight >= innerHeight-1000) {
                this.infiniteLoadDone()
            }
        },
        infiniteLoadDone () {
            let self = this;
            //总页数
            if(self.totalCount >self.totalPage){
                self.totalPage +=1;
                $.post('https://api.songfuniaops.com/article/comments-list?token='+self.articleToken, {
                    p: self.totalPage,
                    article_id: self.articleID ,
                }, function (res) {
                    if(res.code == 200){
                       /* console.log(res.data.list);*/
                        res.data.forEach(function (item,index) {
                            self.commentList.push(item)
                        });
                    }
                });
            }else {
                return
            }


        },
    },
     created: function () {
        let self = this;
        let url = location.search; //获取url中"?"符后的字串
         if (url.indexOf("?") != -1) {
             let str = url.substr(1);
             strs = str.split("&");
             self.articleID = decodeURIComponent(strs[0].replace("article_id=", ""));
             self.articleToken = decodeURIComponent(strs[1].replace("token=", ""));
         }

     },

});

//控制音乐按钮的显示或隐藏
$(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() > 500) {
            $('.mp-article-music-migu-fixed').show();
        } else {
            $('.mp-article-music-migu-fixed').hide();
        }
    });
});