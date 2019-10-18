<?php

use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use GuzzleHttp\Client;

function uploadImage($file)
{
    try {
        $folder = config('app.userphotos_folder');

        list($width, $height) = getimagesize($file);
        if ($height > $width) {
            $height = config('app.image_dimension');
            $width = null;
        } else {
            $width = config('app.image_dimension');
            $height = null;
        }

        $thumb_size = config('app.image_thumb_dimension');

        $pathname = is_string($file) ? $file : $file->getPathname();
        $file_content = Image::make($pathname)
            ->resize($width, $height, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            })
            ->response()->original;

        $filename = str_random(20);
        Storage::disk('local')->put($folder . $filename, $file_content);
        $thumb_content = Image::make($pathname)->fit($thumb_size)->response()->original;
        Storage::disk('local')->put($folder . 'thumb/' . $filename, $thumb_content);

        return $filename;
    } catch (Exception $e) {
    }
}

function getBucketPreUrl()
{
    return 'https://s3-' . env('AWS_REGION') . '.amazonaws.com/' . env('AWS_BUCKET') . '/';
}

function getUserPhotoUrl($user)
{
    $preUrl = getBucketPreUrl();
    if ($user && isset($user->photo) && $user->photo) {
        return url($preUrl . $user->photo);
    } else {
        return '';
    }
}

function getPreviewFileUrl($url)
{
    $preUrl = getBucketPreUrl();

    if ($url && $extension = pathinfo($url, PATHINFO_EXTENSION)) {
        switch ($extension) {
            case 'gif':
            case 'png':
            case 'jpg':
            case 'jpeg':
            case 'bmp':
                return url($preUrl . $url);
            case 'doc':
            case 'docx':
            case 'pages':
                return url('/img/icons/icon-doc.png');
            case 'pdf':
                return url('/img/icons/icon-pdf.png');
            case 'ppt':
            case 'pptx':
            case 'key':
            case 'pps':
                return url('/img/icons/icon-ppt.png');
            case 'xls':
            case 'xlsx':
            case 'xlr':
                return url('/img/icons/icon-xls.png');
            default:
                return url('/img/icons/icon-default.png');
        }
    } else {
        return '';
    }
}

function getLinkedinFields($token)
{
    $httpClient = new Client();

    $response = $httpClient->get(
        'https://api.linkedin.com/v1/people/~:(public-profile-url,picture-urls::(original),positions:(is-current,company:(name)))',
        [
            'headers' => [
                'Accept-Language' => 'en-US',
                'x-li-format' => 'json',
                'Authorization' => 'Bearer ' . $token,
            ],
        ]);

    return json_decode($response->getBody()->getContents(), true);
}

function getMultipleDataTemplate()
{
    return array(
        'total' => null,
        'offset' => null,
        'limit' => null,
        'items' => array(),
    );
}

function convertDateToStandard($date)
{
    $tmstp = strtotime($date);

    return date('Y-m-d', $tmstp);
}

function convertDateToFormat($date, $format = 'M d, Y')
{
    if (!$date) {
        return null;
    }

    $tmstp = strtotime($date);
    return date($format, $tmstp);
}

function generateDateRange($date_from, $date_to = null)
{
    $temp = '';
    if ($date_from) {
        $temp = convertDateToFormat($date_from);
    }
    if ($date_to) {
        $temp .= ' - ' . convertDateToFormat($date_to);
    }

    return $temp;
}

function generateTimeRange($time_from, $time_to = null)
{
    $temp = '';
    if ($time_from) {
        $temp = convertDateToFormat($time_from, 'g:i A');
    }
    if ($time_to) {
        $temp .= ' - ' . convertDateToFormat($time_to, 'g:i A');
    }

    return $temp;
}

function amPMCheck($time, $part = 'AM')
{
    if (!$time && $part == 'AM') {
        return 'checked';
    }

    $ampm = convertDateToFormat($time, 'A');

    return $ampm == $part ? 'checked' : '';
}

function buildTopicsLine($topics, $limit = null)
{
    $list = [];
    $full_list = [];
    $i = 0;
    $counter = 0;
    foreach ($topics as $topic) {
        if (($limit && $limit > $i) || !$limit) {
            $list[] = $topic->title;
        } else {
            $counter++;
        }

        $full_list[] = $topic->title;

        $i++;
    }

    if ($counter) {
        $item = '<span data-toggle="tooltip" data-placement="top" title="' . implode(', ',
                $full_list) . '">+' . $counter . '</span>';
        $list[] = $item;
    }

    return implode(', ', $list);
}

function stringifyModels($array, $field, $glue)
{
    $temp = [];
    foreach ($array as $item) {
        $temp[] = $item->$field;
    }

    return implode($glue, $temp);
}

function stringifyRelationshipModels($array, $field, $column, $glue, $limit = null)
{
    $temp = [];
    foreach ($array as $item) {
        $temp[] = $item->$field->$column;
    }

    if ($limit) {
        $temp = array_slice($temp, -$limit);
    }

    return implode($glue, $temp);
}

function getInitials($value)
{
    $letters = '';
    foreach (explode(' ', $value) as $word) {
        $letters .= $word[0];
    }

    return $letters;
}

function getMailnuggetsEmail($id)
{
    $email_tpl = "mail@{id}.onepitch.mailnuggets.com";

    $email = str_replace('{id}', $id, $email_tpl);

    return $email;
}

function adjustUrl($url)
{
    if (strpos($url, 'http') === false) {
        return 'http://' . $url;
    }

    return $url;
}

function getDailyMailTimeInPST($timezone, $number)
{
    switch ($number) {
        case '1':
            if ($timezone === 'MST') {
                return '6:00 AM';
            } elseif ($timezone === 'CST') {
                return '7:00 AM';
            } elseif ($timezone === 'EST') {
                return '8:00 AM';
            } else {
                return '5:00 AM';
            }
        case '2':
            if ($timezone === 'MST') {
                return '9:00 AM';
            } elseif ($timezone === 'CST') {
                return '10:00 AM';
            } elseif ($timezone === 'EST') {
                return '11:00 AM';
            } else {
                return '8:00 AM';
            }
        case '3':
            if ($timezone === 'MST') {
                return '12:00 PM';
            } elseif ($timezone === 'CST') {
                return '1:00 PM';
            } elseif ($timezone === 'EST') {
                return '2:00 PM';
            } else {
                return '11:00 AM';
            }
        case '4':
            if ($timezone === 'MST') {
                return '3:00 PM';
            } elseif ($timezone === 'CST') {
                return '4:00 PM';
            } elseif ($timezone === 'EST') {
                return '5:00 PM';
            } else {
                return '2:00 PM';
            }
    }
}

function processVimeoUrl($videoUrl)
{
    $oEmbedEndpoint = 'http://vimeo.com/api/oembed';

    $jsonUrl = $oEmbedEndpoint . '.json?url=' . rawurlencode($videoUrl) . '&color=ffd831&portrait=0&title=0&byline=0';

    $curl = curl_init($jsonUrl);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_TIMEOUT, 30);
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
    $return = curl_exec($curl);
    curl_close($curl);

    $oEmbed = json_decode($return);

    return $oEmbed;
}

function timeago($datetime) {
    $datetime = date('Y-m-d H:i:s', strtotime($datetime));
    $now = new DateTime;
    $ago = new DateTime($datetime);
    $diff = $now->diff($ago);

    $diff->w = floor($diff->d / 7);
    $diff->d -= $diff->w * 7;

    $string = array(
        'y' => 'year',
        'm' => 'month',
        'w' => 'week',
        'd' => 'day',
        'h' => 'hour',
        'i' => 'minute',
        's' => 'second',
    );
    foreach ($string as $k => &$v) {
        if ($diff->$k) {
            $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? 's' : '');
        } else {
            unset($string[$k]);
        }
    }

    if (!$full) $string = array_slice($string, 0, 1);
    return $string ? implode(', ', $string) . ' ago' : 'just now';
 }