<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use GuzzleHttp\Client;

/**
 * App\Models\BaseModel
 *
 * @mixin \Eloquent
 */
class Pardot extends Model
{
    private $client;
    private $base_url = 'https://go.pardot.com/l/506841/2018-05-14/';

    // Lists
    const PUBLICIST_SIGN_UP = '26qh3p';
    const JOURNALIST_SIGN_UP = '26qh3h';

    public function __construct() {
        $this->client = new Client();
    }

    public function addToList($list_id, $params) {
        $result = $this->client->request('POST', $this->base_url.$list_id, [
            'form_params' => $params
        ]);

        return $result;
    }

    public function postTemplateUrl($url, $params)
    {
        $result = $this->client->request('POST', $url, [
            'form_params' => $params
        ]);

        return $result;
    }

    public function deleteFromList($list_id, $params) {
        $result = $this->client->request('DELETE', $this->base_url.$list_id, [
            'form_params' => $params
        ]);

        return $result;
    }

    public function pitchSubmitted($params) {
        $result = $this->client->request('POST', 'https://go.pardot.com/l/506841/2018-06-12/28bsjf', [
            'form_params' => $params
        ]);

        return $result;
    }
}