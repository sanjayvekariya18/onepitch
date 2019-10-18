<?php

namespace App\Services;

use App\Exceptions\Instagram\InstagramException;

class InstagramService
{
    /**
     * @param int $limit
     * @return array
     * @throws InstagramException
     */
    public function getMedia ($limit = 12)
    {
        $login = config('services.instagram.login');
        $url = "https://www.instagram.com/$login/?__a=1";
        $ch = curl_init($url);
        $options = [
            CURLOPT_CONNECTTIMEOUT => 20 ,
            CURLOPT_AUTOREFERER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_RETURNTRANSFER => true
        ];

        curl_setopt_array($ch, $options);
        $data = curl_exec($ch);
        $data = json_decode($data, true);

        if ($data['graphql']['user'] && $data['graphql']['user']['edge_owner_to_timeline_media'] && $data['graphql']['user']['edge_owner_to_timeline_media']['edges']) {
            $items = $data['graphql']['user']['edge_owner_to_timeline_media']['edges'];
            $filteredItems = [];

            if ($limit !== false && count($items) > $limit) {
                $items = array_slice($items, 0, $limit);
            }

            foreach ($items as $item) {
                $link = 'https://www.instagram.com/p/'.$item['node']['shortcode'].'/?taken-by='.$data['graphql']['user']['username'];
                $filteredItems[] = ['imageUrl' => $item['node']['thumbnail_src'], 'link' => $link];
            }

            return $filteredItems;
        }

        throw new InstagramException('Instagram Exception');
    }
}