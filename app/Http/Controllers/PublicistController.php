<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\SocialKeyword;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Providers\TwitterAPIExchange;
use Session;

class PublicistController extends Controller
{

    public function supportCenter(Request $request) {
        $videoUrl = 'https://vimeo.com/255108804';

        return view('publicist.support_center', [
            'videoUrl' => $videoUrl
        ]);
    }

    public function socialListeningDashboard(Request $request)
    {
        $tweetObj = new TwitterAPIExchange;
        $this->user = Auth::user();
        $keywords = SocialKeyword::select('id', 'keyword')->where('user_id', $this->user->id)->orderBy('id', 'DESC')->get()->toArray();
        $data = array();
        if (!empty($keywords)) {
            $keywords = array_slice($keywords, 0, 4);
            foreach ($keywords as $key => $keyword) {
                $data[$key]['keywordId'] = $keyword['id'];
                $data[$key]['keyword'] = $keyword['keyword'];
                $data[$key]['data'] = $tweetObj->getTweets($keyword['keyword']);
            }
        }

        return view('publicist.social_listening_dashboard', [
            'tweets' => $data
        ]);
    }

    
    public function socialListeningDashboardLoadmore(Request $request) {
        $tweetObj = new TwitterAPIExchange;
        $this->user = Auth::user();
        $data = $tweetObj->getTweets($request['keyword'],'','',$request['max_id']-1);
        return view('publicist.social_listening_dashboard_loadmore', [
            'tweets' => $data
        ]); 
    }

    public function saveKeyword(Request $request) {
       $this->user = Auth::user();
       if(!empty($request['keyword'])){
        $keywordExists = SocialKeyword::where('user_id',$this->user->id)->count();
        if($keywordExists==4){
         Session::flash('flasherror', 'Reached max limit of keywords. Try removing some.');
         return response('error');
        }
           $keywordExists = SocialKeyword::where('user_id',$this->user->id)->where('keyword',$request['keyword'])->count();
           if($keywordExists>0){
            Session::flash('flasherror', 'Duplicate keyword can not be added.');
            return response('error');
           }
            SocialKeyword::insert(['user_id'=>$this->user->id,'keyword'=>$request['keyword']]);
            Session::flash('flash', 'New keyword has been added.');
            return response('success');
       }       
       Session::flash('flasherror', 'Error occurred.');
       return response('error');
    }


    public function deleteKeyword(Request $request) {
        $this->user = Auth::user();
        if(!empty($request['keywordId'])){        
            $keywordExists = SocialKeyword::where('user_id',$this->user->id)->where('id',$request['keywordId'])->count();
            if($keywordExists==0){
             Session::flash('flasherror', 'You are not authorized for this action.');
             return response('error');
            }
            SocialKeyword::where('id',$request['keywordId'])->delete();
             Session::flash('flash', 'Keyword has been removed.');
             return response('success');
        }       
        Session::flash('flasherror', 'Error occurred.');
        return response('error');
     }

     
    public function editKeyword(Request $request) {
        $this->user = Auth::user();
        if(!empty($request['keywordId'])){
         $keywordExists = SocialKeyword::where('id',$request['keywordId'])->count();
         if($keywordExists==0){
            Session::flash('flasherror', 'Invalid keyword.');
            return response('error');
           }
           $keywordExists = SocialKeyword::where('user_id',$this->user->id)->where('id',$request['keywordId'])->count();
           if($keywordExists==0){
              Session::flash('flasherror', 'You are not authorized for this action.');
              return response('error');
             }
             SocialKeyword::where(['id'=>$request['keywordId']])->update(['keyword'=>$request['keyword']]);
             Session::flash('flash', 'keyword has been updated.');
             return response('success');
        }       
        Session::flash('flasherror', 'Error occurred.');
        return response('error');
     }

    
}