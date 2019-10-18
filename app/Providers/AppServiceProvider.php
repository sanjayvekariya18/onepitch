<?php

namespace App\Providers;

use App\Repositories\Alert\AlertRepository;
use App\Repositories\Alert\AlertRepositoryInterface;
use App\Repositories\BlogCategory\BlogCategoryRepository;
use App\Repositories\BlogCategory\BlogCategoryRepositoryInterface;
use App\Repositories\BlogPostCategory\BlogPostCategoryRepository;
use App\Repositories\BlogPostCategory\BlogPostCategoryRepositoryInterface;
use App\Repositories\Brand\BrandRepository;
use App\Repositories\Brand\BrandRepositoryInterface;
use App\Repositories\Faq\FaqRepository;
use App\Repositories\Faq\FaqRepositoryInterface;
use App\Repositories\Industry\IndustryRepository;
use App\Repositories\Industry\IndustryRepositoryInterface;
use App\Repositories\Inquiry\InquiryRepository;
use App\Repositories\Inquiry\InquiryRepositoryInterface;
use App\Repositories\InquiryIndustry\InquiryIndustryRepository;
use App\Repositories\InquiryIndustry\InquiryIndustryRepositoryInterface;
use App\Repositories\Topic\TopicRepository;
use App\Repositories\Topic\TopicRepositoryInterface;
use App\Repositories\Administrators\AdministratorsRepository;
use App\Repositories\Administrators\AdministratorsRepositoryInterface;
use App\Repositories\Journalist\JournalistRepository;
use App\Repositories\Journalist\JournalistRepositoryInterface;
use App\Repositories\Pitch\PitchRepository;
use App\Repositories\Pitch\PitchRepositoryInterface;
use App\Repositories\PitchIndustry\PitchIndustryRepository;
use App\Repositories\PitchIndustry\PitchIndustryRepositoryInterface;
use App\Repositories\Publicist\PublicistRepository;
use App\Repositories\Publicist\PublicistRepositoryInterface;
use App\Repositories\User\UserRepository;
use App\Repositories\User\UserRepositoryInterface;
use App\Repositories\BlogPost\BlogPostRepository;
use App\Repositories\BlogPost\BlogPostRepositoryInterface;
use Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider;
use Illuminate\Support\ServiceProvider;
use Rollbar\Rollbar;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        error_reporting(E_ALL ^ E_NOTICE);

        if (app()->environment('staging') || app()->environment('production')) {
            Rollbar::init([
                'access_token' => '3f21db5f85bd42b4900262ee5b5e316e',
                'environment' => $this->app->environment()
            ]);
        } else {
            $this->app->register(IdeHelperServiceProvider::class);
        }

        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(PublicistRepositoryInterface::class, PublicistRepository::class);
        $this->app->bind(JournalistRepositoryInterface::class, JournalistRepository::class);
        $this->app->bind(PitchRepositoryInterface::class, PitchRepository::class);
        $this->app->bind(InquiryRepositoryInterface::class, InquiryRepository::class);
        $this->app->bind(AdministratorsRepositoryInterface::class, AdministratorsRepository::class);
        $this->app->bind(IndustryRepositoryInterface::class, IndustryRepository::class);
        $this->app->bind(PitchIndustryRepositoryInterface::class, PitchIndustryRepository::class);
        $this->app->bind(InquiryIndustryRepositoryInterface::class, InquiryIndustryRepository::class);
        $this->app->bind(TopicRepositoryInterface::class, TopicRepository::class);
        $this->app->bind(BlogPostRepositoryInterface::class, BlogPostRepository::class);
        $this->app->bind(BlogCategoryRepositoryInterface::class, BlogCategoryRepository::class);
        $this->app->bind(BlogPostCategoryRepositoryInterface::class, BlogPostCategoryRepository::class);
        $this->app->bind(BrandRepositoryInterface::class, BrandRepository::class);
        $this->app->bind(FaqRepositoryInterface::class, FaqRepository::class);
        $this->app->bind(AlertRepositoryInterface::class, AlertRepository::class);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
		//
    }
}
