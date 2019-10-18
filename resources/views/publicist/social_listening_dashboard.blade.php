@extends('layouts.simple')

@section('title', 'Social Listening Dashboard')

@section('content')
<style>
.col-sm-4.tweetpanels {
    padding: 5px;
}
.panel-info {
    border-color: transparent;box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.05);
}
.panel-heading{    padding: 5px;}
.tweetpanels p{font-size: 13px;}
.tweetpanels .thumbnail{    border: 0;margin-bottom: 5px;}
.thumbnail .caption {
    padding: 2px;    border-bottom: 1px solid lightgray;    padding-bottom: 5px;
}
.btn-done-wrapper {
    top: 109px;
}
.panel-body {
    padding: 0;height: 500px;
        overflow-y: scroll;
}
.tweetpanels .thumbnail p.timeago{    margin-left: 5px;color:darkgray; font-size: 12px;
    float: left;
    margin-top: -10px;}
    .tweetpanels .panel-title, .panel-info>.panel-heading{background-color:#FFD831; color:#414745;}
    .caption i,.caption span{    color: darkgray;}
.btn-done-wrapper .inputDiv{    margin-left: 145px;
    width: 270px;margin-top: 1px;display:none;}
.save-draft.addKeywordBtn{    width: 145px;float: left;} 
.save-draft.addKeywordBtn i{    margin: 0 5px 0 -10px !important;}
.toast-wrapper .toast-inner.toast-error{    background-color: #FF3232 !important; color:white !important;}
.saveKeywordBtn{cursor:pointer;}
/* .toggleClsKeyword{
    left: 0;z-index:0;
}*/
.toggleClsKeyword1{
    left: 0;z-index:1;
} 
.fltrht{float: right;}
.AfterKeywordRemoved{    background: lightgrey;
    height: 545px;
    margin-top: 5px;}
    .SpinnerLoad{position: fixed; 
    top: 55%;
    left: 51.5%;
    margin: -50px 0px 0px -50px;
    box-shadow: 0px 0px 12px 3px lightgrey;
    border-radius: 5px;}
    .SpinnerLoad img{    width: 60px;}
    
.full-width main .container{
    width: 100%;    margin-top: -60px;
}
.col-sm-2 {
    width: 20%;    padding: 0 5px 0 5px;
}
.centered {
   text-align: center;
   font-size: 0;
}
.centered > div {
   float: none;
   display: inline-block;
   text-align: left;
   font-size: 13px;
}
.swal-text{    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
    color: #414745;}
    .swal-content__input{
        height: 64px;
        background-color: #fff7d6;
        line-height: 56px;
        padding: 4px 16px;
        vertical-align: middle;
        font-size: 16px;
        color: #414745;
        margin-bottom: 43px;
        border:0 !important;
    }
    .swal-content__input:active, .swal-content__input:focus{
    border-radius: 0;
    box-shadow: none;
    border:0 !important;
}
.swal-button.swal-button--cancelEdit {
    background-color: #C9352C;
}
</style>
    <div class="container">
        <div class="content title">
            <h2 class="text-center">Social Listening Dashboard</h2> 
            <hr class="small"/>
        </div>
<br>
        <div class="btn-done-wrapper toggleClsKeyword1">
            <a class="btn save-draft addKeywordBtn"><i class="material-icons">add</i>Keyword</a>
            <div class="form-group inputDiv">
                <div class="input-group white-input">
                    <input type="text" id="search-industry" class="form-control keywordInputField" placeholder="Enter a keyword">
                    <div class="input-group-addon saveKeywordBtn"><img src="/img/icon-search.svg"></div>
                </div>
            </div>
        </div>

        <div class="content content-area">
            <div class="row centered">

            <?php 
            $keywordCount= 1;
                if(!empty($tweets)){
                    foreach($tweets as $keyOuter=>$tweetOuter){

                        ?>

                <div class="col-sm-2 tweetpanels">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h3 class="panel-title"><i class="fab fa-twitter"></i>&nbsp;&nbsp;<span id="keyword<?php echo $tweetOuter['keywordId']; ?>"><?php echo $tweetOuter['keyword']; ?></span>
                            <span class="fltrht editKeyword" style="padding: 0px 5px 0 5px;margin-left: 5px;" attr-keyword="<?php echo $tweetOuter['keyword']; ?>" attr-id="<?php echo $tweetOuter['keywordId']; ?>"><i class="fas fa-ellipsis-v"></i></i></span>
                            <span class="fltrht deleteKeyword" attr-keyword="<?php echo $tweetOuter['keyword']; ?>" attr-id="<?php echo $tweetOuter['keywordId']; ?>"><i class="far fa-trash-alt"></i></span>
                            </h3>
                        </div>
                        <div class="panel-body">
                        <?php 
                        if(!empty($tweetOuter['data']->statuses)){
                            foreach($tweetOuter['data']->statuses as $k=>$tweet){
                        ?>
                            <div style="float: left;width: 100%;" class="thumbnail repeatingTweet" attr-max-id="{{ $tweet->id }}"> 
                            <?php if(!empty($tweet->retweeted_status->full_text)){  ?>
                                <div class="" style="float:left;width: 98%;margin: 5px 0px 5px 5px;color:darkgray;">
                                <i class="fas fa-retweet"></i> <span style="color:cornflowerblue;"><?php echo $tweet->retweeted_status->user->screen_name; ?></span> retweeted
                                </div>
                            <?php } ?>
                                <span><img style="border-radius: 50px;float: left;" src="<?php echo $tweet->user->profile_image_url_https; ?>"></span>
                                <h4 style="float: left;margin-left: 5px;font-size: 15px;margin-top: 2px;width: 75%;"><?php echo $tweet->user->screen_name; ?></h4>  
                                <p class="timeago">{{ timeago($tweet->created_at) }}</p>                         
                                <div class="caption " style="float:left;">                            
                                <p><?php 
                                    if(!empty($tweet->retweeted_status->full_text)){ 
                                        $tweet->retweeted_status->full_text = preg_replace('/(?:^|\s)#(\w+)/', ' <a target="_blank" href="https://twitter.com/hashtag/$1?src=hash">#$1</a>', $tweet->retweeted_status->full_text);
                                        $tweet->retweeted_status->full_text = preg_replace('/(?:^|\s)@(\w+)/', ' <a target="_blank" href="https://twitter.com/$1">@$1</a>', $tweet->retweeted_status->full_text);
                                        if(!empty($tweet->entities->urls)){
                                            foreach($tweet->entities->urls as $urlv){                                                
                                                $tweet->retweeted_status->full_text = str_replace($urlv->url,' <a target="_blank" href="'.$urlv->url.'">'.$urlv->display_url.'</a>',$tweet->retweeted_status->full_text);
                                            }
                                        }
                                        echo $tweet->retweeted_status->full_text;
                                    }else{
                                        $tweet->full_text = preg_replace('/(?:^|\s)#(\w+)/', ' <a target="_blank" href="https://twitter.com/hashtag/$1?src=hash">#$1</a>', $tweet->full_text);
                                        $tweet->full_text = preg_replace('/(?:^|\s)@(\w+)/', ' <a target="_blank" href="https://twitter.com/$1">@$1</a>', $tweet->full_text);
                                        if(!empty($tweet->entities->urls)){
                                            foreach($tweet->entities->urls as $urlv){                                                
                                                $tweet->full_text = str_replace($urlv->url,' <a target="_blank" href="'.$urlv->url.'">'.$urlv->display_url.'</a>',$tweet->full_text);
                                            }
                                        }
                                        echo $tweet->full_text;
                                    } 
                                        ?></p>
                                          <?php if(!empty($tweet->entities->media[0]->media_url)){ ?>
                                    <img style="width: 100%;" src="<?php echo $tweet->entities->media[0]->media_url; ?>">
                                          <?php } ?>
                                    &nbsp;&nbsp;
                                    <a target="_blank" href="https://twitter.com/<?php echo $tweet->user->screen_name; ?>/status/<?php echo $tweet->id; ?>"><i class="fas fa-reply"></i></a>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <i class="fas fa-retweet"></i>&nbsp;&nbsp;<span><?php echo $tweet->retweet_count; ?></span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <i class="fas fa-heart"></i>&nbsp;&nbsp;<span><?php echo $tweet->favorite_count; ?></span>
                                </div>                                
                            </div>
                        <?php 
                       
                         }
                        }
                        ?>   
                            
                        </div>
                    </div>
                </div>

                <?php 
                
                /*
                if($keywordCount % 3 == 0){ ?>
                    </div>
                    <div class="row">
                <?php } */

                $keywordCount++;
                         }
                        }
                        ?>   



               
            

                        
        </div>
    </div>

    @if (Session::get('flash'))
        <div id="success-flash" class="toast-wrapper">
            <div class="toast-inner toast-success">
                {{ Session::get('flash') }}
            </div>
        </div>
    @endif

    @if (Session::get('flasherror'))
        <div id="error-flash" class="toast-wrapper">
            <div class="toast-inner toast-error">
                {{ Session::get('flasherror') }}
            </div>
        </div>
    @endif
    <div class="SpinnerLoad"><img id="loading-image" src="/images/loader-gif.gif" alt=""></div>
@endsection

@push('js')
<script src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.5/jquery-ui.min.js'></script> 
    <script>
     $(window).on('load',function() {
        $('.SpinnerLoad').fadeOut();
        });
    $(document).ready(function(){

        $('.side_icon').on('click', function(){
            $('.btn-done-wrapper').animate({left:'250px'},500);
        });
        $('.closebtn').on('click', function(){
            $('.btn-done-wrapper').animate({left:'0px'},500);
        });

        $('.tweetpanels .panel-body').on('scroll', function() {
            if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                thisObj = $(this);
                $('.SpinnerLoad').show();
                var keywordVal = $(this).parent().find('.deleteKeyword').attr('attr-keyword');
                var max_idVal = $(this).find('div.repeatingTweet').last().attr('attr-max-id');
                var request = $.ajax({
                    url: laroute.route('social_listening_dashboard_loadmore'),
                    method: "GET",
                    data: { keyword : keywordVal, max_id : max_idVal },   
                    success: function (data) {
                        $('.SpinnerLoad').hide();
                        thisObj.append(data);           
                    },
                });
            }
        })
        
        @if (Session::get('flash'))
          setTimeout(function () {
            $('#success-flash').fadeOut()
          }, 5000)

          @endif
          @if (Session::get('flasherror'))
          setTimeout(function () {
            $('#error-flash').fadeOut()
          }, 5000)

          @endif
var clickCount = 0;
        $('.addKeywordBtn').click(function (e) {
            e.stopPropagation();
            $('.btn-done-wrapper .inputDiv').animate({width:'toggle'},350);  
            // if(clickCount % 2 == 0 )
            // { 
            //         $('.btn-done-wrapper').removeClass('toggleClsKeyword').addClass('toggleClsKeyword1');
            // }else{
            //     setTimeout(function () {
            //         $('.btn-done-wrapper').removeClass('toggleClsKeyword1').addClass('toggleClsKeyword');
            //     },700);
            // }            
            // clickCount = clickCount + 1;   
        });

        $('.saveKeywordBtn').click(function (e) {
            $('.SpinnerLoad').show();
            var keywordVal = $( "input.keywordInputField" ).val();
            var request = $.ajax({
            url: laroute.route('save_social_keyword'),
            method: "POST",
            data: { keyword : keywordVal },   
            success: function (data) {
                if(data=="success"){
                    $( "input.keywordInputField" ).val('');
                    $('.addKeywordBtn').trigger('click');            
                }
                location.reload(true);        
            },
        });
           
        });

        $('.deleteKeyword').click(function (e) {
            thisObj = $(this);
            thisParentObj = $(this).parent().parent().parent().parent();
            swal({
                title: 'Are you sure?',                
                buttons: {
                    cancelIndustry: {
                        text: 'Cancel',
                        value: 'cancel',
                    },
                    confirmSelection: {
                        text: 'Yes',
                        value: 'yes',
                    }
                },
            }).then(function (response) {
                if (response == 'yes') {
                    var keywordId = thisObj.attr('attr-id');
                    $('.SpinnerLoad').show();
                    var request = $.ajax({
                        url: laroute.route('delete_social_keyword'),
                        method: "POST",
                        data: { keywordId : keywordId },   
                        success: function (data) {
                            if(data=="success"){
                                thisObj.parent().parent().parent().fadeOut("slow");      
                                thisParentObj.addClass('AfterKeywordRemoved');  
                            }
                            location.reload(true);        
                        },
                    });
                }
            });
           
        });


        $('.editKeyword').click(function (e) {
            thisObj = $(this);
            thisParentObj = $(this).parent().parent().parent().parent();
            var keywordId = thisObj.attr('attr-id');
            var keyword = thisObj.attr('attr-keyword');
            swal("Edit Keyword", {
                content: {
                    element: "input",
                    attributes: {
                        placeholder: "Type your keyword",
                        value: keyword,
                        type: "text",
                        },
                    },
                buttons: {
                    cancelEdit: {
                        text: 'Cancel',
                        value: 'cancel',
                    },
                    confirmSelection: {
                        text: 'Confirm',
                        value: 'save',
                    }
                },
            }).then(function (response) {                
                if (response === false) return false;

                if (response === "") {
                    swal.showInputError("You need to enter some keyword!");
                    return false
                }
                var keywordText = $('.swal-content__input').val();
                if (response != "" && response != null && response == 'save') {
                    $('.SpinnerLoad').show();
                    var request = $.ajax({
                        url: laroute.route('edit_social_keyword'),
                        method: "POST",
                        data: { keywordId : keywordId, keyword : keywordText },   
                        success: function (data) {
                            $('#keyword'+keywordId).text(keywordText);
                            location.reload(true);        
                        },
                    });
                }else{

                }    
            });
           
        });





    });
        function delay(callback, ms) {
            var timer = 0;
            return function () {
                var context = this, args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function () {
                    callback.apply(context, args);
                }, ms || 0);
            };
        }

    </script>
@endpush