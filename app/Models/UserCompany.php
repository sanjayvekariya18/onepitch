<?php

namespace App\Models;
use Illuminate\Support\Collection;

/**
 * App\Models\UserTour
 *
 * @property int $id
 * @property int $user_id
 * @property string|null $company
 * @property string|null $website
 * @property string|null $location
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\UserCompanyIndustry[] $industries
 * @property-read \App\Models\User $user
 * @mixin \Eloquent
 */
class UserCompany extends BaseModel
{
    use FullTextSearch;

    protected $table = 'user_companies';

    protected $fillable = [
        'user_id', 'company', 'website', 'location', 'twitter_url', 'linkedin_url', 'facebook_url', 'instagram_url',
        'youtube_url', 'vimeo_url'
    ];

    /**
     * The columns of the full text index
     */
    protected $searchable = [
        'company',
        'location'
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function industries() {
        return $this->hasMany('App\Models\UserCompanyIndustry');
    }

    /**
     * @return Collection
     */
    public function getIndustries()  : Collection
    {
        $collection = new Collection();
        foreach ($this->industries as $industry) {
            $collection->push($industry->industry);
        }
        return $collection;
    }

    public function getSocialLinks() : Collection
    {
        $socialLinks = new Collection();

        if(!empty($this->twitter_url)){
            $socialLinks->push($this->twitter_url);
        }
        if(!empty($this->linkedin_url)){
            $socialLinks->push($this->linkedin_url);
        }
        if(!empty($this->facebook_url)){
            $socialLinks->push($this->facebook_url);
        }
        if(!empty($this->instagram_url)){
            $socialLinks->push($this->instagram_url);
        }
        if(!empty($this->youtube_url)){
            $socialLinks->push($this->youtube_url);
        }
        if(!empty($this->vimeo_url)){
            $socialLinks->push($this->vimeo_url);
        }

        return $socialLinks;
    }

    /**
     * @return Collection
     */
    public function getTopics () : Collection
    {
        $collection = new Collection();
        foreach ($this->industries[0]->topics as $topic) {
            $collection->push($topic->topic);
        }
        return $collection;
    }

    public static function addCompany($data) {
        $userCompany = UserCompany::create($data);

        self::addCompanyIndustryAndTopic($data, $userCompany->id);
    }

    public static function editCompany($data) {
        $userCompany = UserCompany::find($data['brand_id']);

        $userCompany->fill($data);
        $userCompany->save();

        foreach ($userCompany->industries as $industry) {
            foreach ($industry->topics as $topic) {
                $topic->delete();
            }
        }
        foreach ($userCompany->industries as $industry) {
            $industry->delete();
        }

        self::addCompanyIndustryAndTopic($data, $userCompany->id);
    }

    public static function deleteCompany($brand_id) {
        $userCompany = UserCompany::find($brand_id);

        foreach ($userCompany->industries as $industry) {
            foreach ($industry->topics as $topic) {
                $topic->delete();
            }
        }
        foreach ($userCompany->industries as $industry) {
            $industry->delete();
        }

        $userCompany->delete();
    }

    public static function addCompanyIndustryAndTopic($data, $userCompanyId) {
        foreach ($data['industries'] as $industry) {
            $userCompanyIndustry = UserCompanyIndustry::create(['user_company_id' => $userCompanyId, 'industry_id' => $industry]);

            foreach ($data['topics'] as $topic) {
                UserCompanyIndustryTopics::create(['user_company_industry_id' => $userCompanyIndustry->id, 'topic_id' => $topic]);
            }
        }
    }
}