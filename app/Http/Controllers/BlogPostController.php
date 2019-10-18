<?php

namespace App\Http\Controllers;

use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\BlogPostImage;
use Illuminate\Http\Request;

class BlogPostController extends Controller
{
    public function blog()
    {
        $blogPosts = BlogPost::where('status', 1)->with('user',
            'blog_post_categories.category')->orderBy('published_at', 'desc')->get();
        $featuredPost = $blogPosts->shift();
        $blogCategories = BlogCategory::all();

        return view('blog.index', [
            'featuredPost' => $featuredPost,
            'blogCategories' => $blogCategories,
            'blogPosts' => $blogPosts,
        ]);
    }

    public function getBlogPlot(Request $request)
    {
        $blogPost = BlogPost::where('link', $request->link)->firstOrFail();
        return view('blog.post-layout', [
            'blogPost' => $blogPost,
        ]);
    }

    public function getSeriesBlogPost(Request $request)
    {
        $linkArr = explode('/blog/', $request->url());
        $link = $linkArr[1];
        $blogPost = BlogPost::where('link', $link)->firstOrFail();
        return view('blog.post-layout', [
            'blogPost' => $blogPost,
        ]);
    }

    public function firstBlog()
    {
        return view('blog.first-post');
    }

    public function secondBlog()
    {
        return view('blog.second-post');
    }

    public function imageUpload(Request $request)
    {
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $imageName = $file->getClientOriginalName();
            $file->move(public_path('/img/blog/'), $imageName);
            if ($request->input('type') == 'featured') {
                $blogPost = BlogPost::find($request->input('post_id'));
                $blogPost->featured_image = $imageName;
                $blogPost->save();
            } else {
                $blogPostImage = new BlogPostImage();
                $blogPostImage->blog_post_id = $request->input('post_id');
                $blogPostImage->image = $imageName;
                $blogPostImage->save();
            }
        }
    }

    public function deleteImage(Request $request)
    {
        $image = BlogPostImage::find($request->input('image_id'));
        $image->delete();
        unlink('/img/blog/'.$request->input('image_name'));
    }
}