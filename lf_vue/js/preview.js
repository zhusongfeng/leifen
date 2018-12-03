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

new Vue({
    el: '#app',
    data: {
        //信息
        userInformation:[],
        //歌曲信息
        musicInformation:[],
        //歌曲名称
        musicName:'',
        //文章内容
        contentList:[],
        //控制展开阅读全文
        isHidden:true,
        loader:true,
        //特效
        specialEffects:'',
        articleToken:'',
    },
    mounted() {


    },
    methods: {
        init: function () {
            let self = this;
            $.post('https://api.songfuniaops.com/article/ajax-preview', {
               /* token: 'tAOXebNMDdp5Q3YUiLNXwi31PeAIJQsHZBLW6oOe',*/
                token: self.articleToken,
            }, function (res) {
                if(res.code == 200){
                  self.userInformation = res.data;
                  self.musicInformation = res.data.music;
                  self.musicName = res.data.music.music;
                  // self.musicName = 'http://oss.songfuniaops.com/uploads/music/74176181190800128.mp3';
                  self.contentList =res.data.content;
                   self.specialEffects = res.data.tag;
                  setTimeout(function () {
                      self.loader = false;
                  },600);

                    // self.specialEffects = "autumnScenery"
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
        },
        musicPlay:function () {
            let self = this;
            console.log(self.musicName)
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
            self.musicPlay();
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
        }
    },
    created: function () {
        let self = this;
        let code = window.location.href.split('?')[1];
        self.articleToken = code.split('=')[1];
        self.$nextTick(function () {
            //初始化数据
            this.init();
        })


    },

});

//控制音乐按钮的显示或隐藏
$(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $('.mp-article-music-migu-fixed').show();
        } else {
            $('.mp-article-music-migu-fixed').hide();
        }
    });
});