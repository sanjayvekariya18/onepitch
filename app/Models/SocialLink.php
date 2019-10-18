<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocialLink extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        'link',
        'type',
        'icon',
        'url'
    ];

    const TWITTER_TYPE = 'twitter';
    const LINKEDIN_TYPE = 'linkedin';

    /**
     * @return string
     */
    public function getImageForEmail ()
    {
        switch ($this->type) {
            case 'linkedin' : return asset('img/email/icn-linked-in-grey@3x.png');
            case 'twitter' : return asset('img/email/icn-twitter-grey@3x.png');
            default : return '';
        }
    }

    /**
     * @return array
     */
    public static function getTypes () : array
    {
        return [
            self::TWITTER_TYPE => self::TWITTER_TYPE,
            self::LINKEDIN_TYPE => self::LINKEDIN_TYPE
        ];
    }

    /**
     * @return array
     */
    public static function typeLinks () : array
    {
        return [
            self::TWITTER_TYPE => 'https://twitter.com/',
            self::LINKEDIN_TYPE => 'https://www.linkedin.com/in/',
        ];
    }

    /**
     * @throws \InvalidArgumentException
     * @return string
     */
    public function getLinkByType () : string
    {
        $types = self::typeLinks();
        if (isset($types[$this->type])) {
            return $types[$this->type];
        }

        throw new \InvalidArgumentException('Type are broken');
    }

    /**
     * @param $url
     */
    public function setUrlAttribute ($url)
    {
        if (preg_match('/(http)/', $url)) {
            $this->attributes['url'] = $url;
        } else {
            $this->attributes['url'] = 'https://'.$url;
        }
    }
}
