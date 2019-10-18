<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DrewM\MailChimp\MailChimp as MC;

/**
 * App\Models\BaseModel
 *
 * @mixin \Eloquent
 */
class MailChimp extends Model
{
    private $mc;
    private $api_key = '83f1a0fdfbe3a03f6b879961a4d252f3-us15';
    
    // Lists
    const PUBLICIST_ACCOUNTS = '60f42e1a88';
    const CONTACT_FORM_LIST = '7a5b8b2b40';
    const JOURNALIST_BETA_USERS_LIST = '5faffe7cdc';
    const PUBLICIST_BETA_USERS_LIST = '55facdbb80';
    
    public function __construct() {
        $this->mc = new MC($this->api_key);
    }

    public function addToList($list_id, $params) {
        $result = $this->mc->post('lists/'.$list_id.'/members', array(
            'email_address' => $params['email'],
            'merge_vars'    => array('FNAME' => $params['name']),
            'status'        => 'subscribed',
        ));

        return $result;
	}

	public function deleteFromList($list_id, $hash) {
        return $this->mc->delete('lists/'.$list_id.'/members/'.$hash);
	}
}