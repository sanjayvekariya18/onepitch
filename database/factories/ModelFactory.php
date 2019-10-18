<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Models\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'role' => array_random([\App\Models\User::ROLE_PUBLICIST, \App\Models\User::ROLE_JOURNALIST]),
        'full_name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'company' => $faker->company,
//        'photo' => $faker->image(public_path(config('app.userphotos_folder')), 320, 320, null, false),
        'is_admin' => 0,
        'approved' => array_random([true, false, null]),
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});


$factory->define(App\Models\UserIndustry::class, function (Faker\Generator $faker) {
    $industryIds = \App\Models\Industry::all()->pluck('id')->toArray();
    $userIds = \App\Models\User::all()->pluck('id')->toArray();

    return [
        'user_id' => $faker->randomElement($userIds),
        'industry_id' => $faker->randomElement($industryIds)
    ];
});

$factory->define(\App\Models\Pitch::class, function (Faker\Generator $faker) {
    $userIds = (new \App\Models\User)->where('role', \App\Models\User::ROLE_PUBLICIST)->pluck('id')->toArray();

    $lengthPoint = 15;

    return [
        'user_id' => $faker->randomElement($userIds),
        'subject' => $faker->title,
        'company' => $faker->company,
        'status' => $faker->randomElement(\App\Models\Pitch::getStatuses()),
        'what_point_1' => $faker->text($lengthPoint),
        'what_point_2' => $faker->text($lengthPoint),
        'what_point_3' => $faker->text($lengthPoint),
        'what_point_4' => $faker->text($lengthPoint),
        'what_point_5' => $faker->text($lengthPoint),
        'why_point_1' => $faker->text($lengthPoint),
        'why_point_2' => $faker->text($lengthPoint),
        'why_point_3' => $faker->text($lengthPoint),
        'why_point_4' => $faker->text($lengthPoint),
        'why_point_5' => $faker->text($lengthPoint),
    ];
});

$factory->define(\App\Models\Inquiry::class, function (Faker\Generator $faker) {
    $userIds = (new \App\Models\User)->where('role', \App\Models\User::ROLE_JOURNALIST)->pluck('id')->toArray();

    $lengthPoint = 15;

    return [
        'user_id' => $faker->randomElement($userIds),
        'subject' => $faker->title,
        'company' => $faker->company,
        'status' => $faker->randomElement(\App\Models\Pitch::getStatuses()),
        'what_point_1' => $faker->text($lengthPoint),
        'what_point_2' => $faker->text($lengthPoint),
        'what_point_3' => $faker->text($lengthPoint),
        'what_point_4' => $faker->text($lengthPoint),
        'what_point_5' => $faker->text($lengthPoint),
        'why_point_1' => $faker->text($lengthPoint),
        'why_point_2' => $faker->text($lengthPoint),
        'why_point_3' => $faker->text($lengthPoint),
        'why_point_4' => $faker->text($lengthPoint),
        'why_point_5' => $faker->text($lengthPoint),
    ];
});

$factory->define(\App\Models\PitchEvent::class, function (Faker\Generator $faker) {
    $pitchIds = (new \App\Models\Pitch)->whereDoesntHave('event')->pluck('id')->toArray();

    return [
        'pitch_id' => $faker->randomElement($pitchIds),
        'title' => $faker->title(),
        'date_from' => $faker->date(),
        'date_to' => $faker->date(),
        'time_from' => $faker->time(),
        'time_to' => $faker->time()
    ];
});

$factory->define(\App\Models\PitchIndustry::class, function (Faker\Generator $faker) {
    $pitchIds = \App\Models\Pitch::all()->pluck('id')->toArray();
    $industryIds = \App\Models\Industry::all()->pluck('id')->toArray();

    return [
        'pitch_id' => $faker->randomElement($pitchIds),
        'industry_id' => $faker->randomElement($industryIds),
    ];
});

$factory->define(\App\Models\PitchIndustryTopic::class, function (Faker\Generator $faker) {
    $pitchIndustryIds = \App\Models\PitchIndustry::all()->pluck('id')->toArray();
    $topicIds = \App\Models\IndustryTopic::all()->pluck('id')->toArray();

    return [
        'pitch_industry_id' => $faker->randomElement($pitchIndustryIds),
        'topic_id' => $faker->randomElement($topicIds),
    ];
});

$factory->define(\App\Models\InquiryIndustry::class, function (Faker\Generator $faker) {
    $inquiryIds = \App\Models\Inquiry::all()->pluck('id')->toArray();
    $industryIds = \App\Models\Industry::all()->pluck('id')->toArray();

    return [
        'inquiry_id' => $faker->randomElement($inquiryIds),
        'industry_id' => $faker->randomElement($industryIds),
    ];
});

$factory->define(\App\Models\InquiryIndustryTopic::class, function (Faker\Generator $faker) {
    $inquiryIndustryIds = \App\Models\InquiryIndustry::all()->pluck('id')->toArray();
    $topicIds = \App\Models\IndustryTopic::all()->pluck('id')->toArray();

    return [
        'inquiry_industry_id' => $faker->randomElement($inquiryIndustryIds),
        'topic_id' => $faker->randomElement($topicIds),
    ];
});

$factory->define(\App\Models\InquiryEvent::class, function (Faker\Generator $faker) {
    $inquiryIds = (new \App\Models\Inquiry)->whereDoesntHave('event')->pluck('id')->toArray();

    return [
        'inquiry_id' => $faker->randomElement($inquiryIds),
        'title' => $faker->title(),
        'date_from' => $faker->date(),
        'date_to' => $faker->date(),
        'time_from' => $faker->time(),
        'time_to' => $faker->time()
    ];
});