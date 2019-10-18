<?php

namespace App\Services;


class UtilityService
{
    public static function emailFromString ($emailString)
    {
        preg_match('/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i', $emailString, $matches);
        return !empty($matches) ?  $matches[0] : null;
    }

    public static function getPublicistWorks()
    {
        return collect([
            'I am a marketer',
            'I am a PR specialist working at an agency',
            'I am a PR specialist working at a company',
        ]);
    }

    public static function getJournalistWorks()
    {
        return collect([
            'I am an editor',
            'I am a journalist/reporter'
        ]);
    }

    public static function getSenorityList()
    {
        return collect([
            'Entity',
            'Senior',
            'Manager',
            'Director',
            'VP',
            'CXO',
            'Owner',
            'Partner',
        ]);
    }
}