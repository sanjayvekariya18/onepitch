<?php 
if(!empty($tweets->statuses)){
    foreach($tweets->statuses as $k=>$tweet){
?>
    <div style="float: left;width: 100%;" class="thumbnail repeatingTweet" attr-max-id="{{ $tweet->id }}"> 
    <?php if(!empty($tweet->retweeted_status->full_text)){  ?>
        <div class="" style="float:left;width: 98%;margin: 5px 0px 5px 5px;color:darkgray;">
        <i class="fas fa-retweet"></i> <span style="color:cornflowerblue;"><?php echo $tweet->retweeted_status->user->screen_name; ?></span> retweeted
        </div>
    <?php } ?>
        <span><img style="border-radius: 50px;float: left;" src="<?php echo $tweet->user->profile_image_url_https; ?>"></span>
        <h4 style="float: left;margin-left: 5px;font-size: 15px;margin-top: 2px;width: 80%;"><?php echo $tweet->user->screen_name; ?></h4>  
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