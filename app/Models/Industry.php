<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Industry
 *
 * @property int $id
 * @property string $title
 * @property string|null $full_title
 * @property string|null $description
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\UserIndustry[] $user_industries
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\UserCompanyIndustry[] $user_company_industries
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\IndustryKeyword[] $keywords
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Industry whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Industry whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Industry whereFullTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Industry whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Industry whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Industry whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Industry extends BaseModel
{
    use FullTextSearch, SoftDeletes;

	protected $table = 'industries';
	
	protected $fillable = [
			'title', 'full_title', 'description',
	];

    protected $dates = ['deleted_at'];

    /**
     * The columns of the full text index
     */
    protected $searchable = [
        'title',
        'full_title'
    ];

	const TOPIC_COMMENTARY = 1;
	const TOPIC_COMPANY_CULTURE = 2;
	const TOPIC_CONTRACT_ANNOUNCEMENT = 3;
	const TOPIC_EVENTS = 4;
	const TOPIC_HIRINGS = 5;
	const TOPIC_FUNDING = 6;
	const TOPIC_TRENDS = 7;
	const TOPIC_MERGERS = 8;
	const TOPIC_COMPANY_LAUNCHES = 9;
	const TOPIC_PRODUCT_LAUNCHES = 10;
	const TOPIC_REGULATIONS = 11;
	const TOPIC_LEADERSHIP = 12;

	public static function getTopics($topic = null) {
		$topics = [
			self::TOPIC_COMMENTARY => 'Commentary for Breaking/Current Events',
			self::TOPIC_COMPANY_CULTURE => 'Company Culture',
			self::TOPIC_CONTRACT_ANNOUNCEMENT => 'Contract/Partnership Announcement',
			self::TOPIC_EVENTS => 'Current events/Date Related (add fill-in to specify event)',
			self::TOPIC_HIRINGS => 'Executive Hirings & Departures',
			self::TOPIC_FUNDING => 'Funding & Exits (Private or Public)',
			self::TOPIC_TRENDS => 'General (Industry) Trends',
			self::TOPIC_MERGERS => 'Mergers & Acquisitions',
			self::TOPIC_COMPANY_LAUNCHES => 'New Company Launches',
			self::TOPIC_PRODUCT_LAUNCHES => 'New Product/Service Launches',
			self::TOPIC_REGULATIONS => 'Regulations',
			self::TOPIC_LEADERSHIP => 'Thought leadership',
		];

		if (!$topic) {
			return $topics;
		} else {
			return isset($topics[$topic]) ? $topics[$topic] : null;
		}
	}

	public function user_industries() {
		return $this->hasMany('App\Models\UserIndustry');
	}

    public function user_company_industries() {
        return $this->hasMany('App\Models\UserCompanyIndustry');
    }

    public function keywords() {
        return $this->hasMany('App\Models\IndustryKeyword');
    }
}