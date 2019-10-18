<?php

namespace App\Models;

use App\Notifications\JournalistApproved;
use App\Notifications\JournalistConfirm;
use App\Notifications\JournalistDenied;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Notifications\ResetPasswordCustomNotification;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Session;

/**
 * App\Models\User
 *
 * @property int $id
 * @property int $role
 * @property string|null $full_name
 * @property string|null $company
 * @property string|null $email
 * @property string|null $username
 * @property string|null $phone_number
 * @property string|null $linkedin_id
 * @property string|null $twitter_id
 * @property string|null $password
 * @property string|null $remember_token
 * @property string|null $photo
 * @property string|null $twitter_url
 * @property string|null $linkedin_url
 * @property int $is_verified
 * @property string|null $verification_code
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property \Carbon\Carbon|null $last_login
 * @property int $is_admin
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Industry[] $industries
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Pitch[] $pitches
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Inquiry[] $inquiries
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\UserIndustry[] $user_industries
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\UserCompany[] $companies
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\SavedPitch[] $saved_pitches
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\SavedInquiry[] $saved_inquiries
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\PitchLog[] $pitch_logs
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\InquiryLog[] $inquiry_logs
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereCompany($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereFullName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereIsAdmin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereIsVerified($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereLinkedinId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereLinkedinUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User wherePhoto($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereTwitterId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereTwitterUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereUsername($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereVerificationCode($value)
 * @mixin \Eloquent
 * @property int|null $approved
 * @property int|null $has_industry
 * @property string|null $daily_mail_time
 * @property string|null $daily_mail_timezone
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereApproved($value)
 * @property int $subscribe
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereSubscribe($value)
 * @property int $agree_tos
 * @property string|null $referral_hash
 * @property int|null $referral_id
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereAgreeTos($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereReferralHash($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereReferralId($value)
 * @property-read string $initials
 * @property-read array $socials
 * @property string|null $mailnuggets_id
 */
class User extends Authenticatable implements CanResetPassword
{
    use FullTextSearch;
    use Notifiable;
    use \Illuminate\Auth\Passwords\CanResetPassword;

    const SUPER_ADMIN = 99;
    const ADMIN = 90;
    const ROLE_JOURNALIST = 1;
    const ROLE_PUBLICIST = 2;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'role',
        'full_name',
        'company',
        'email',
        'username',
        'linkedin_id',
        'twitter_id',
        'password',
        'photo',
        'twitter_url',
        'linkedin_url',
        'subscribe',
        'agree_tos',
        'referral_hash',
        'referral_id',
        'is_verified',
        'verification_code',
        'approved',
        'last_login',
        'hear_about',
        'hear_about_other',
        'has_industry',
        'phone_number',
        'title',
        'birthday',
        'daily_mail_time',
        'daily_mail_timezone',
        'mailnuggets_id',
        'author_url',
        'publication_url',
        'vc',
        'senority',
        'working_as'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The columns of the full text index
     */
    protected $searchable = [
        'full_name',
        'company'
    ];

	public function industries() {
		return $this->belongsToMany('App\Models\Industry', 'user_industry', 'user_id', 'industry_id');
	}

	public function user_industries() {
		return $this->hasMany('App\Models\UserIndustry');
	}

	public function pitches() {
		return $this->hasMany('App\Models\Pitch');
	}

    public function inquiries() {
        return $this->hasMany('App\Models\Inquiry');
    }

    public function blogPost() {
        return $this->hasMany('App\Models\BlogPost');
    }

	public static function getOneBy($field, $value) {
		return self::where($field, $value)->first();
	}

	public static function getBy($field, $value) {
		return self::where($field, $value)->get();
	}

    public function meetUp()
    {
        return $this->hasOne('App\Models\MeetUp');
    }

    public function tour()
    {
        return $this->hasOne('App\Models\UserTour');
    }

    public function alerts() {
        return $this->hasMany('App\Models\UserAlert');
    }

    public function saved_pitches() {
        return $this->hasMany('App\Models\SavedPitch');
    }

    public function saved_inquiries() {
        return $this->hasMany('App\Models\SavedInquiry');
    }

    public function pitch_logs() {
        return $this->hasMany('App\Models\PitchLog');
    }

    public function inquiry_logs() {
        return $this->hasMany('App\Models\InquiryLog');
    }

    public function pitch_views() {
        return $this->hasMany('App\Models\PitchView');
    }

    public function inquiry_views() {
        return $this->hasMany('App\Models\InquiryView');
    }

    public function pitch_mail_clicks() {
        return $this->hasMany('App\Models\PitchMailClick');
    }

    public function inquiry_mail_clicks() {
        return $this->hasMany('App\Models\InquiryMailClick');
    }

    public function companies()
    {
        return $this->hasMany('App\Models\UserCompany');
    }

    public function scopeOutlets($query)
    {
        $query->journalist()->whereNotNull('company');
    }

    /**
     * Scope a query to only include journalist users.
     *
     * @param $query
     * @return mixed
     */
    public function scopeJournalist($query)
    {
        return $query->where('role', self::ROLE_JOURNALIST );
    }

    /**
     * Scope a query to only include publicist users.
     *
     * @param $query
     * @return mixed
     */
    public function scopePublicist($query)
    {
        return $query->where('role', self::ROLE_PUBLICIST );
    }

	public static function register($data, $verified = false) {
		$original_pass = $data['password'];
		$data['password'] = $original_pass ? bcrypt($original_pass) : '';
		if ($verified) {
			$data['is_verified'] = 1;
		} else {
			$data['verification_code'] = sha1(str_random(20).time());
		}

		if (isset($data['photo'])) {
			//add photos
            $file = $data['photo'];
            $name = time() . $file->getClientOriginalName();
            $filePath = 'profile/' . $name;
            Storage::disk('s3')->put($filePath, file_get_contents($file));

            $data['photo'] = $filePath;
		}

		if (isset($data['agree_tos']) && $data['agree_tos']) {
			$data['referral_hash'] = sha1(str_random(20).time());
		}

		if ($referral_id = Session::get('referral_id')) {
			$data['referral_id'] = $referral_id;
			Session::remove('referral_id');
		}

		$user = User::create($data);

		return $user;
	}

	public function edit($data) {
		if (isset($data['photo'])) {
            //add photos
            $file = $data['photo'];
            $name = time() . $file->getClientOriginalName();
            $filePath = 'profile/' . $name;
            Storage::disk('s3')->put($filePath, file_get_contents($file));

            if ($this->photo) {
                $oldUrl = $this->photo;
                Storage::disk('s3')->delete($oldUrl);
            }

			$data['photo'] = $filePath;
		}

		$this->fill($data);
		if (!$this->referral_hash) {
			$this->referral_hash = sha1(str_random(20).time());
		}

		$this->save();

		return $this;
	}

	public static function createOrGetFromSocial($data, $social_field) {
        $userToRenew = User::where('email', $data['email'])->first();
        if(!empty($userToRenew) && (array) $userToRenew[$social_field] !== $data[$social_field]){
            $userToRenew->update([
                $social_field => $data[$social_field]
            ]);

            return $userToRenew;
        }

        $user = self::getOneBy($social_field, $data[$social_field]);
		if (!$user) {
			$data['verification_code'] = sha1(str_random(20).time());

			if (isset($data['photo'])) {
                //add photos
                $file = $data['photo'];
                $name = time() . sha1(str_random(5).time());
                $filePath = 'profile/' . $name;
                Storage::disk('s3')->put($filePath, file_get_contents($file));

                $data['photo'] = $filePath;
			}
			$user = User::create($data);
		}

		return $user;
	}

    public function listAlerts()
    {
        $alerts = $this->alerts()->orderBy('read_at')->orderBy('created_at', 'desc')
            ->limit(30)->get();

        return $alerts;
	}

    public function getAlertNotifiable()
    {
        $notifiableAlerts = $this->alerts()->notifiable()->get()->count();

        return ($notifiableAlerts) ? $notifiableAlerts : '';
    }

	public function listIndustriesWithTopics($full_topics = false) {
		$industries = [];
		foreach ($this->industries as $industry) {
			$temp['industry'] = $industry;
			$u_industry = UserIndustry::where('user_id', $this->id)
				->where('industry_id', $industry->id)
				->first();

			if ($full_topics) {
				$temp['topics'] = [];

				if ($u_industry) {
					$temp['topics'] = $u_industry->topics;
				}
			} else {
				$temp['json'] = [];

				if ($u_industry) {
					$topics = $u_industry->topics_list;
					$temp['json']['topics'] = $topics;

				}
				$temp['json']['industry'] = $industry->id;

				$temp['json'] = json_encode($temp['json']);
			}

			$industries[] = $temp;
		}

		return $industries;
	}

    /**
     * @param $email
     * @param $password
     * @throws \Exception
     * @return \Illuminate\Database\Eloquent\Model|null|static
     * @throws \Exception
     */
	public static function checkAdminLogin($email, $password)
    {
		$user = (new self)->where('email', $email)
            ->whereIn('role', [
                self::SUPER_ADMIN,
                self::ADMIN,
            ])
            ->first();
		if ($user === null) {
            throw new \Exception('No such user');
		}

		if (!password_verify($password, $user->password)) {
		    throw new \Exception('Wrong password');
		}

		if (!$user->is_verified) {
            throw new \Exception('User isn\'t verified');
		}

		return $user;
	}
	public static function checkIfLoginValid($email, $password) {
		$user = User::where('email', $email)->first();
		if (!$user) {
			return 'No such user';
		}

		if (!password_verify($password, $user->password)) {
			return 'Wrong password';
		}

        if (!$user->agree_tos) {
		    return $user;
        }

		if (!$user->is_verified) {
			return "User isn't verified";
		}

		return $user;
	}

    /**
     * @param string $unformattedRawDate
     * @return string
     */
    public function getFormattedDate ($unformattedRawDate) : string
    {
        if ($unformattedRawDate){
            $unformattedDate = Carbon::parse($unformattedRawDate);
            if (Carbon::now()->diffInDays($unformattedDate) < 7)
                return $unformattedDate->diffForHumans();
            else
                return $unformattedDate->format('F d, Y');
        }
        return '';
    }

    /**
     * @return string
     */
    public function getRoleName () : string
    {
        $roles = [
            self::ROLE_JOURNALIST => 'Journalist',
            self::ROLE_PUBLICIST => 'Publicist',
        ];

        if (isset($roles[$this->role])) {
            return $roles[$this->role];
        }

        return '';
    }

    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordCustomNotification($token));
    }

    /**
     * @return bool
     */
    public function hasPhoto() : bool
    {
        return isset($this->photo);
    }

    /**
     * @return \Illuminate\Contracts\Routing\UrlGenerator|string
     */
    public function getPhotoUrl () : string
    {
        if ($this->hasPhoto()) {
            return getUserPhotoUrl($this);
        }

        return '';
    }

    /**
     * @return Collection
     */
    public function getSocials () : Collection
    {
        $collection = new Collection();
        if ($this->linkedin_url) {
            $collection->push(new SocialLink(['link' => $this->linkedin_id ? '/'.$this->linkedin_id : $this->linkedin_url , 'type' => 'linkedin', 'url' => $this->linkedin_url]));
        }

        if ($this->twitter_url) {
            $collection->push(new SocialLink(['link' => $this->twitter_id ? '/'.$this->twitter_id : $this->twitter_url, 'type' => 'twitter', 'url' => $this->twitter_url]));
        }

        return $collection;
    }

    /**
     * @param $name
     * @return Collection
     */
    public function getSocialsAttribute ($name) : Collection
    {
        return $this->getSocials();
    }

    /**
     * @param $name
     * @return string
     */
    public function getInitialsAttribute ($name) : string
    {
        $initials = '';
        $words = preg_split("/[\s,_-]+/", preg_replace('/[^A-Za-z0-9\s\-]/', '', $this->full_name));
        foreach ($words as $w) {
            $initials .= $w[0];
        }

        return $initials;
    }

    public static function boot()
    {
        parent::boot();

        self::updating(function ($user) {
            $currentUser = (new self())->find($user->id);
            if ($user->role === self::ROLE_JOURNALIST && $user->approved !== $currentUser->approved) {
                if ($user->approved === true) {
//                    $user->notify(new JournalistApproved());
                    $fullName = explode(' ', $user->full_name);
                    $firstName = array_shift($fullName);
                    $lastName = implode(' ', $fullName);

                    try {
                        $params = [
                            'email' => $user->email,
                            'first_name' => $firstName,
                            'last_name' => $lastName,
                            'company' => $user->company,
                            'twitter_url' => $user->twitter_url,
                            'linkedin_url' => $user->linkedin_url,
                        ];
                        $pardot = new Pardot();
                        $pardot->addToList(Pardot::JOURNALIST_SIGN_UP, $params);
                    } catch (\Exception $e) {

                    }
                } elseif ($user->approved === false) {
                    $user->notify(new JournalistDenied());
                }
            }
        });
    }
}
