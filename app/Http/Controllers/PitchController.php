<?php

namespace App\Http\Controllers;

use App\Models\IndustryKeyword;
use App\Models\Pardot;
use App\Models\Pitch;
use App\Models\PitchIndustry;
use App\Models\TopicKeyword;
use App\Models\User;
use App\Notifications\PitchConfirm;
use App\Repositories\PitchRepository;
use App\Services\DynamicRecommendationService;
use Auth;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Storage;
use Session;
use DB;


class PitchController extends Controller
{
    protected $user;
    protected $pitch;

    public function __construct(Request $request)
    {
        $this->middleware(function ($request, $next) {
            $this->user = Auth::user();

            if (!$this->user && Session::get('publicist_id')) {
                $user_id = Session::get('publicist_id');
                $this->user = User::find($user_id);
            }

            if ($this->user && !$this->user->agree_tos) {
                return redirect()->route('signup_publicist');
            }

            if ($pitch_id = Session::get('pitch_id')) {
                $this->pitch = Pitch::find($pitch_id);
                if ($this->pitch && $this->user && $this->pitch->user_id != $this->user->id) {
                    $this->pitch = null;
                    Session::remove('pitch_id');
                }
                if (!in_array($this->pitch->status, Pitch::getStatusesToEdit())) {
                    $this->pitch = null;
                    Session::remove('pitch_id');
                }
            }

            return $next($request);
        });
    }

	public function what(Request $request, $pitch_id = null) {
		$user = $this->user;
		$pitch = null;

        $landingEntity = Session::get('landing_entity');

        if(!empty($landingEntity)){
            Session::remove('landing_entity');
        }

        if ($pitch_id == 'create') {
			$pitch = null;
			$this->pitch = null;
			Session::remove('pitch_id');
			$pitch_id = null;
		}
		if ($pitch_id) {
			$pitch = Pitch::find($pitch_id);
			if (($pitch && $pitch->user_id != $user->id) || !in_array($pitch->status, Pitch::getStatusesToEdit())) {
				$pitch = null;
				$this->pitch = null;
			}
		}
		if (!$pitch) {
			$pitch = $this->pitch;
		}
		if ($pitch) {
			Session::put('pitch_id', $pitch->id);
		} else {
			Session::remove('pitch_id');
		}

        if ($request->isMethod('post')) {
            $rules = array(
                'subject' => 'required|max:40',
                'company' => 'required',
                'website' => 'string|max:255|nullable',
            );

            $data = $request->input();

            if ($this->validateInput($data, $rules)) {
                try {
                    DB::connection()->getPdo()->beginTransaction();

					if (!$pitch) {
						$pitch = new Pitch();
						$pitch->user_id = $user->id;
					}else{
                        if($pitch->status == Pitch::STATUS_UPCOMING || $pitch->status == Pitch::STATUS_PUBLISHED){
                            $pitch->pitchEdits()->create([
                                'user_id' => $pitch->user_id,
                                'status' => $pitch->status,
                                'subject' => $pitch->subject,
                                'company' => $pitch->company,
                                'website' => $pitch->website,
                                'what_point_1' => $pitch->what_point_1,
                                'what_point_2' => $pitch->what_point_2,
                                'what_point_3' => $pitch->what_point_3,
                                'what_point_4' => $pitch->what_point_4,
                                'what_point_5' => $pitch->what_point_5,
                                'why_point_1' => $pitch->why_point_1,
                                'why_point_2' => $pitch->why_point_2,
                                'why_point_3' => $pitch->why_point_3,
                                'why_point_4' => $pitch->why_point_4,
                                'why_point_5' => $pitch->why_point_5,
                            ]);
                        }
                    }

					$pitch->subject = $data['subject'];
					$pitch->company = $data['company'];
					$pitch->website = $data['website'];

                    $pitch->save();

                    if ($request->hasFile('file_1')) {
                        $file = $request->file('file_1');
                        $name = time() . $file->getClientOriginalName();
                        $filePath = 'pitch/' . $name;
                        Storage::disk('s3')->put($filePath, file_get_contents($file));

                        if ($pitch->press_release) {
//                            $oldUrl = $pitch->press_release->url;
//                            Storage::disk('s3')->delete($oldUrl);
                            $pitch->press_release->update(['url' => $filePath, 'name' => $file->getClientOriginalName()]);
                        } else {
                            $pitch->press_release()->create(['url' => $filePath, 'name' => $file->getClientOriginalName()]);
                        }
                    }

                    if ($request->hasFile('file_2')) {
                        $file = $request->file('file_2');
                        $name = time() . $file->getClientOriginalName();
                        $filePath = 'pitch/' . $name;
                        Storage::disk('s3')->put($filePath, file_get_contents($file));

                        if ($pitch->files[0]) {
//                          $oldUrl = $pitch->files[0];
//                          Storage::disk('s3')->delete($oldUrl);
                            $pitch->files[0]->update(['url' => $filePath, 'name' => $file->getClientOriginalName()]);
                        } else {
                            $pitch->files()->create(['url' => $filePath, 'name' => $file->getClientOriginalName()]);
                        }
                    }

                    if ($request->hasFile('file_3')) {
                        $file = $request->file('file_3');
                        $name = time() . $file->getClientOriginalName();
                        $filePath = 'pitch/' . $name;
                        Storage::disk('s3')->put($filePath, file_get_contents($file));

                        if ($pitch->files[1]) {
//                          $oldUrl = $pitch->files[1];
//                          Storage::disk('s3')->delete($oldUrl);
                            $pitch->files[1]->update(['url' => $filePath, 'name' => $file->getClientOriginalName()]);
                        } else {
                            $pitch->files()->create(['url' => $filePath, 'name' => $file->getClientOriginalName()]);
                        }
                    }

                    $pitch->save();

                    $deletedFiles = explode(',', $request->input('deleted_files'));
                    $deletedPressReleases = explode(',', $request->input('deleted_press_release'));

                    foreach ($deletedPressReleases as $deletedPressRelease) {
                        $pitchPressRelease = $pitch->press_release;
                        if ($pitchPressRelease && $pitchPressRelease->name == $deletedPressRelease) {
//                          Storage::disk('s3')->delete($pitchPressRelease->url);
                            $pitchPressRelease->delete();
                        }
                    }

                    foreach ($deletedFiles as $deletedFile) {
                        $pitchFile = $pitch->files->where('name', $deletedFile)->first();
                        if ($pitchFile) {
//                          Storage::disk('s3')->delete($pitchFile->url);
                            $pitchFile->delete();
                        }
                    }

                    // Not best practice but would solve updating tour
                    if (Carbon::now()->diffInMinutes($this->user->tour->updated_at) > 1 && $user->tour->pitch_why < 3) {
                        $request['type'] = 'pitch_what';
                        $request['increment'] = 1;

                        $service = new ServiceController();
                        $service->updateUserTour($request);
                    }

                    Session::put('pitch_id', $pitch->id);

                    DB::connection()->getPdo()->commit();

                    return redirect()->route('pitch_why');
                } catch (\Exception $e) {
                    DB::connection()->getPdo()->rollBack();

                    abort(400, $e->getMessage());
                }
            }
        }

        return view('pitch.what', array(
            'pitch' => $pitch,
        ));
    }

    public function why(Request $request, $pitch_id = null)
    {
        $user = $this->user;
        $pitch = null;
        if ($pitch_id == 'create') {
            $pitch = null;
            $this->pitch = null;
            Session::remove('pitch_id');
            $pitch_id = null;
        }
        if ($pitch_id) {
            $pitch = Pitch::find($pitch_id);
            if (($pitch && $pitch->user_id != $user->id) || !in_array($pitch->status, Pitch::getStatusesToEdit())) {
                $pitch = null;
                $this->pitch = null;
            }
        }
        if (!$pitch) {
            $pitch = $this->pitch;
        }
        if (!$pitch) {
            return redirect()->route('pitch_what');
        }
        Session::put('pitch_id', $pitch->id);

        if ($request->isMethod('post')) {
            $rules = array(
                'points' => 'required|array',
                'points.*' => 'max:280',
                'what_points' => 'required|array',
                'what_points.*' => 'max:280',
            );
            $data = $request->input();

            if ($this->validateInput($data, $rules)) {
                try {
                    DB::connection()->getPdo()->beginTransaction();

                    $what_points = [];
                    $i = 1;
                    foreach ($data['what_points'] as $what_point) {
                        if ($what_point) {
                            $what_points['what_point_' . $i] = $what_point;
                            $i++;
                        }
                    }
                    $pitch->fill($what_points);

                    $points = [];
                    $i = 1;
                    foreach ($data['points'] as $point) {
                        if ($point) {
                            $points['why_point_' . $i] = $point;
                            $i++;
                        }
                    }
                    $pitch->fill($points);
                    $pitch->save();

                    // Not best practice but would solve updating tour
                    if (Carbon::now()->diffInMinutes($this->user->tour->updated_at) > 1 && $user->tour->pitch_why < 3) {
                        $request['type'] = 'pitch_why';
                        $request['increment'] = 1;

                        $service = new ServiceController();
                        $service->updateUserTour($request);
                    }

                    DB::connection()->getPdo()->commit();


                    if($pitch->status == Pitch::STATUS_UPCOMING || $pitch->status == Pitch::STATUS_PUBLISHED){
                        return redirect()->route('pitch_finish');

                    }

					return redirect()->route('pitch_where');
				} catch (\Exception $e) {
					DB::connection()->getPdo()->rollBack();

                    abort(400, $e->getMessage());
                }
            }
        }

        return view('pitch.why', array(
            'pitch' => $pitch,
        ));
    }

	public function where(Request $request, $pitch_id = null) {
		$user = $this->user;
		$pitch = null;
		if ($pitch_id == 'create') {
			$pitch = null;
			$this->pitch = null;
			Session::remove('pitch_id');
			$pitch_id = null;
		}
		if ($pitch_id) {
			$pitch = Pitch::find($pitch_id);
			if (($pitch && $pitch->user_id != $user->id) || !in_array($pitch->status, Pitch::getStatusesToEdit())) {
				$pitch = null;
				$this->pitch = null;
			}
		}
		if (!$pitch) {
			$pitch = $this->pitch;
		}
		if (!$pitch) {
			return redirect()->route('pitch_what');
		}

        if($pitch->status == Pitch::STATUS_UPCOMING || $pitch->status == Pitch::STATUS_PUBLISHED){
            return redirect()->route('pitch_why');

        }

		Session::put('pitch_id', $pitch->id);

        // Dynamic Recommendations
        $pitchCollection = [$pitch->subject, $pitch->what_point_1, $pitch->why_point_1, $pitch->why_point_2, $pitch->why_point_3];
        $pitchString = str_replace('"', '', implode(" - ", $pitchCollection));

        $industryRecommendations = collect([]);
        $topicRecommendations = collect([]);
        $industryRecommended = [];
        $topicRecommended = [];
        $words = [];

        $dynamic = new DynamicRecommendationService();

        $industryMatches = collect(DB::select('SELECT keyword FROM industry_keywords WHERE "' . $pitchString . '" LIKE CONCAT(\'%\', keyword, \'%\')'))->pluck('keyword');
        $topicMatches = collect(DB::select('SELECT keyword FROM topic_keywords WHERE "' . $pitchString . '" LIKE CONCAT(\'%\', keyword, \'%\')'))->pluck('keyword');
        $matches = $industryMatches->merge($topicMatches);

        foreach ($matches as $match) {
            if (str_word_count($match) > 1 && !in_array($match, $words)) {
                if (str_word_count($match) > 2) {
                    array_unshift($words, $match);
                } else {
                    $words[] = $match;
                }
            }
        }

        foreach ($words as $word) {
            $industryResults = IndustryKeyword::where('keyword', 'like', $word)->get();
            $topicResults = TopicKeyword::where('keyword', 'like', $word)->get();

            $industryRecommendations = $industryRecommendations->merge($industryResults);
            $topicRecommendations = $topicRecommendations->merge($topicResults);
        }
        $recommendations = [
            'industry' => $industryRecommendations,
            'topic' => $topicRecommendations
        ];

        $keywordRecommendations = $dynamic->getKeywordsRecommendations($pitchCollection);

        $recommendations['industry'] = $recommendations['industry']->merge($keywordRecommendations['industry'])->unique('industry_id')->take(5)->pluck('industry');
        $recommendations['topic'] = $recommendations['topic']->merge($keywordRecommendations['topic'])->unique('industry_topic_id')->take(5)->pluck('topic');

        foreach ($recommendations['industry'] as $value) {
            $industryRecommended[$value->id] = $value->title;
        }

        foreach ($recommendations['topic'] as $value) {
            $topicRecommended[$value->id] = $value->title;
        }

        $selected_industry = $pitch->listIndustriesWithTopics();

        if ($request->isMethod('post')) {
            $rules = array(
                'industry' => 'array|required',
            );
            $data = $request->input();

			if ($this->validateInput($data, $rules)) {
                Session::remove('landing_topic_id');
                Session::remove('landing_industry_id');

				try {
					DB::connection()->getPdo()->beginTransaction();

                    $industries = [];
                    foreach ($request->input('industry') as $industry) {
                        $industries[] = json_decode($industry, true);
                    }

                    if (!is_array($industries)) {
                        return redirect()->route('pitch_where');
                    }

                    PitchIndustry::setIndustries($pitch, $industries);

                    if ($pitch->status == Pitch::STATUS_DRAFT) {
                        $pitch->confirmation_code = sha1(str_random(20) . time());
                    }
                    $pitch->save();

                    // Not best practice but would solve updating tour
                    if (Carbon::now()->diffInMinutes($this->user->tour->updated_at) > 1 && $user->tour->pitch_where < 3) {
                        $request['type'] = 'pitch_where';
                        $request['increment'] = 1;

                        $service = new ServiceController();
                        $service->updateUserTour($request);
                    }

                    DB::connection()->getPdo()->commit();

                    if ($pitch->status == Pitch::STATUS_DRAFT) {
                        $user->notify(new PitchConfirm($pitch));
                    }

                    try {
                        $params = [
                            'email' => $user->email,
                        ];
                        $pardot = new Pardot();
                        $pardot->pitchSubmitted($params);
                    } catch (\Exception $e) {

                    }

                    return redirect()->route('pitch_finish');
                } catch (\Exception $e) {
                    DB::connection()->getPdo()->rollBack();

                    abort(400, $e->getMessage());
                }
            }
        }

        $landedTopicId = Session::get('landing_topic_id');
        $landedIndustryId = Session::get('landing_industry_id');

        $dataView = array(
            'user' => $user,
            'pitch' => $pitch,
            'selected_industry' => $selected_industry,
            'industryRecommendations' => $industryRecommended,
            'topicRecommendations' => $topicRecommended,
            'landedTopicId' => !empty($landedTopicId) ? $landedTopicId : 0,
            'landedIndustryId' => !empty($landedIndustryId) ? $landedIndustryId : 0,
        );

        return view('pitch.where', $dataView);
    }

    public function saveAsDraft(Request $request, $pitch_id = null)
    {
        $user = $this->user;
        $pitch = null;
        if ($pitch_id) {
            $pitch = Pitch::find($pitch_id);
            if (($pitch && $pitch->user_id != $user->id) || !in_array($pitch->status, Pitch::getStatusesToEdit())) {
                $pitch = null;
                $this->pitch = null;
            }
        }
        $data = $request->input();

        switch ($data['step']) {
            case 1:
                try {
                    DB::connection()->getPdo()->beginTransaction();

                    if (!$pitch) {
                        $pitch = new Pitch();
                        $pitch->user_id = $user->id;
                    }

                    $pitch->subject = $data['subject'];
                    $pitch->company = $data['company'];
                    $pitch->website = $data['website'];

                    $pitch->save();

                    if ($request->hasFile('file_1')) {
                        $file = $request->file('file_1');
                        $name = time() . $file->getClientOriginalName();
                        $filePath = 'pitch/' . $name;
                        Storage::disk('s3')->put($filePath, file_get_contents($file));

                        if ($pitch->press_release) {
//                            $oldUrl = $pitch->press_release->url;
//                            Storage::disk('s3')->delete($oldUrl);
                            $pitch->press_release->update(['url' => $filePath, 'name' => $file->getClientOriginalName()]);
                        } else {
                            $pitch->press_release()->create(['url' => $filePath, 'name' => $file->getClientOriginalName()]);
                        }
                    }

                    if ($request->hasFile('file_2')) {
                        $file = $request->file('file_2');
                        $name = time() . $file->getClientOriginalName();
                        $filePath = 'pitch/' . $name;
                        Storage::disk('s3')->put($filePath, file_get_contents($file));

                        if ($pitch->files[0]) {
//                          $oldUrl = $pitch->files[0];
//                          Storage::disk('s3')->delete($oldUrl);
                            $pitch->files[0]->update(['url' => $filePath, 'name' => $file->getClientOriginalName()]);
                        } else {
                            $pitch->files()->create(['url' => $filePath, 'name' => $file->getClientOriginalName()]);
                        }
                    }

                    if ($request->hasFile('file_3')) {
                        $file = $request->file('file_3');
                        $name = time() . $file->getClientOriginalName();
                        $filePath = 'pitch/' . $name;
                        Storage::disk('s3')->put($filePath, file_get_contents($file));

                        if ($pitch->files[1]) {
//                          $oldUrl = $pitch->files[1];
//                          Storage::disk('s3')->delete($oldUrl);
                            $pitch->files[1]->update(['url' => $filePath, 'name' => $file->getClientOriginalName()]);
                        } else {
                            $pitch->files()->create(['url' => $filePath, 'name' => $file->getClientOriginalName()]);
                        }
                    }

                    $pitch->save();

                    $deletedFiles = explode(',', $request->input('deleted_files'));
                    $deletedPressReleases = explode(',', $request->input('deleted_press_release'));

                    foreach ($deletedPressReleases as $deletedPressRelease) {
                        $pitchPressRelease = $pitch->press_release;
                        if ($pitchPressRelease && $pitchPressRelease->name == $deletedPressRelease) {
//                          Storage::disk('s3')->delete($pitchPressRelease->url);
                            $pitchPressRelease->delete();
                        }
                    }

                    foreach ($deletedFiles as $deletedFile) {
                        $pitchFile = $pitch->files->where('name', $deletedFile)->first();
                        if ($pitchFile) {
//                          Storage::disk('s3')->delete($pitchFile->url);
                            $pitchFile->delete();
                        }
                    }

                    // Not best practice but would solve updating tour
                    if (Carbon::now()->diffInMinutes($this->user->tour->updated_at) > 1 && $user->tour->pitch_why < 3) {
                        $request['type'] = 'pitch_what';
                        $request['increment'] = 1;

                        $service = new ServiceController();
                        $service->updateUserTour($request);
                    }

                    Session::put('pitch_id', $pitch->id);

                    DB::connection()->getPdo()->commit();

                    return redirect()->route('pitch_why');
                } catch (\Exception $e) {
                    DB::connection()->getPdo()->rollBack();

                    abort(400, $e->getMessage());
                }
                break;
            case 2:
                try {
                    DB::connection()->getPdo()->beginTransaction();

                    $what_points = [];
                    $i = 1;
                    foreach ($data['what_points'] as $what_point) {
                        if ($what_point) {
                            $what_points['what_point_' . $i] = $what_point;
                            $i++;
                        }
                    }
                    $pitch->fill($what_points);

                    $points = [];
                    $i = 1;
                    foreach ($data['points'] as $point) {
                        if ($point) {
                            $points['why_point_' . $i] = $point;
                            $i++;
                        }
                    }
                    $pitch->fill($points);
                    $pitch->save();

                    // Not best practice but would solve updating tour
                    if (Carbon::now()->diffInMinutes($this->user->tour->updated_at) > 1 && $user->tour->pitch_why < 3) {
                        $request['type'] = 'pitch_why';
                        $request['increment'] = 1;

                        $service = new ServiceController();
                        $service->updateUserTour($request);
                    }

                    DB::connection()->getPdo()->commit();

                    return redirect()->route('pitch_where');
                } catch (\Exception $e) {
                    DB::connection()->getPdo()->rollBack();

                    abort(400, $e->getMessage());
                }
                break;
            case 3:
                try {
                    DB::connection()->getPdo()->beginTransaction();

                    $industries = [];
                    if($request->has('industry')){
                        foreach ($request->input('industry') as $industry) {
                            $industries[] = json_decode($industry, true);
                        }
                    }

                    if (!is_array($industries)) {
                        return redirect()->route('pitch_where');
                    }

                    PitchIndustry::setIndustries($pitch, $industries);

                    if ($pitch->status === Pitch::STATUS_DRAFT) {
                        $pitch->confirmation_code = sha1(str_random(20) . time());
                    }

                    $pitch->save();

                    DB::connection()->getPdo()->commit();

                    return redirect()->route('pitch_where');
                } catch (\Exception $e) {
                    DB::connection()->getPdo()->rollBack();

                    abort(400, $e->getMessage());
                }
                break;
        }


    }

    public function finish(Request $request)
    {
        $user = $this->user;
        $pitch = $this->pitch;

        if (!$pitch) {
            return redirect()->route('pitch_what');
        }

        Session::remove('publicist_id');
        Session::remove('pitch_id');
        return view('pitch.finish', array(
            'user' => $user,
            'pitch' => $pitch,
        ));
    }

    public function publicistNoPitch(Request $request)
    {
        $user = $this->user;
        Session::remove('publicist_id');

        return view('pitch.no_pitch', array(
            'user' => $user,
        ));
    }

    public function journalistSave(Request $request, $user_id, $code)
    {
        try {
            $pitch = Pitch::where('confirmation_code', $code)->firstOrFail();
            $user = User::findOrFail($user_id);

            if ($pitch->status > Pitch::STATUS_NEW &&
                !$user->saved_pitches()->where('pitch_id', $pitch->id)->count()) {

                $user->saved_pitches()->create(['pitch_id' => $pitch->id]);

                if (!$pitch->mail_clicks()->where('user_id', $user->id)->count()) {
                    $pitch->mail_clicks()->create(['user_id' => $user->id]);
                }

                $pitch->increment('clicks');

                Session::flash('saved_pitch_id', $pitch->id);
            }

            if (Auth::check()) {
                Auth::logout();
            }

            Auth::login($user);

            return redirect()->route('profile');
        } catch (\Exception $e) {
            return redirect('/');
        }
    }

    public function confirm(Request $request, $code)
    {
        $pitch = Pitch::getOneBy('confirmation_code', $code);

        if ($pitch) {
            $user = $pitch->user;
            if ($pitch->status == Pitch::STATUS_DRAFT) {
                Session::flash('confirmed_pitch_id', $pitch->id);
            }

            $pitch->status = Pitch::STATUS_NEW;
            $pitch->uploaded_at = date('Y-m-d H:i:s');
            $pitch->save();

            if (!$user->is_verified) {
                $user->is_verified = 1;
                $user->verification_code = null;
                $user->save();
            }

            Auth::login($user);

            return redirect()->route('profile');
        }

        return response('Wrong pitch');
    }

    public function cancel(Request $request, $code)
    {
        $pitch = Pitch::getOneBy('confirmation_code', $code);

        if ($pitch) {
            $user = $pitch->user;

            if ($pitch->status != Pitch::STATUS_DRAFT) {
                Session::flash('cancelled_pitch_id', $pitch->id);
            }

            $pitch->status = Pitch::STATUS_DRAFT;
            $pitch->save();

            Auth::login($user);

            return redirect()->route('profile');
        }

        return response('Wrong pitch');
    }

    public function edit(Request $request, $code)
    {
        $pitch = Pitch::getOneBy('confirmation_code', $code);

        if ($pitch) {
            $user = $pitch->user;

            Auth::login($user);

            return redirect()->route('pitch_what', $pitch->id);
        }

        return response('Wrong pitch');
    }

    public function delete(Request $request, $pitch_id)
    {
        $pitch = Pitch::find($pitch_id);

        if ($pitch && $pitch->user_id == Auth::user()->id) {
            try {
                DB::connection()->getPdo()->beginTransaction();

                $pitch->remove();

                DB::connection()->getPdo()->commit();
            } catch (\Exception $e) {
                DB::connection()->getPdo()->rollBack();
            }
        }

        return response('');
    }

    public function loadPitches(Request $request)
    {
        $limit = 5;
        $filters['term'] = $request->input('term');
        $offset = $request->input('offset', 0);
        $user = Auth::user();
        $filters['user'] = $user;
        $pitches = PitchRepository::getAll($filters, $limit, $offset);

        $showing = $limit * $offset + count($pitches['items']);

        return view('pitch.pitches_table_rows', array(
            'pitches' => $pitches,
            'offset' => $offset,
            'user' => $user,
            'limit' => $limit,
            'showing' => $showing,
        ));
    }

    public function loadSavedPitches(Request $request)
    {
        $limit = 5;
        $filters['term'] = $request->input('term');
        $offset = $request->input('offset', 0);
        $user = Auth::user();
        $filters['user'] = $user;
        $filters['saved_pitches'] = $user->saved_pitches;
        $pitches['items'] = $user->saved_pitches->load('pitch')->pluck('pitch')->splice($offset, $limit); //PitchRepository::getAll($filters, $limit, $offset);
        $pitches['total'] = count($filters['saved_pitches']);

        $showing = $limit * $offset + count($pitches['items']);

        return view('pitch.pitches_saved_table_rows', array(
            'pitches' => $pitches,
            'offset' => $offset,
            'user' => $user,
            'limit' => $limit,
            'showing' => $showing,
        ));
    }

    public function loadPitchesHistory(Request $request)
    {
        $limit = 5;
        $filters['term'] = $request->input('term');
        $offset = $request->input('offset', 0);
        $user = Auth::user();
        $filters['user'] = $user;
        $filters['saved_pitches'] = $user->pitch_logs;
        $pitches['items'] = $user->pitch_logs->load('pitch')->pluck('pitch')->splice($offset, $limit); //PitchRepository::getAll($filters, $limit, $offset);
        $pitches['total'] = count($filters['saved_pitches']);

        $showing = $limit * $offset + count($pitches['items']);

        return view('pitch.pitches_history_table_rows', array(
            'pitches' => $pitches,
            'offset' => $offset,
            'user' => $user,
            'limit' => $limit,
            'showing' => $showing,
        ));
    }

    public function viewModal(Request $request)
    {
        $pitchId = $request->input('pitch_id');

        try {
            $user = Auth::user();
            $pitch = Pitch::findOrFail($pitchId);
            $pitch->load('saved_pitches.user');
            $indstrs_data = $pitch->listIndustriesAndTopics();
            $savedPitches = $pitch->saved_pitches;

            return view('pitch.view_modal', array(
                'pitch' => $pitch,
                'indstrs_data' => $indstrs_data,
                'savedPitches' => $savedPitches,
                'user' => $user,
            ));
        } catch (ModelNotFoundException $e) {
            return response('');

        } catch (\Exception $e) {
            return response('');
        }

    }

    public function featuredPitchJune(Request $request)
    {
        return view('pitch.featured.june', [
            'is_logged' => Auth::check()
        ]);
    }

    public function featuredPitchMay(Request $request)
    {
        return view('pitch.featured.may', [
            'is_logged' => Auth::check()
        ]);
    }

    public function featuredPitchApril(Request $request)
    {
        return view('pitch.featured.april', [
            'is_logged' => Auth::check()
        ]);
    }

    public function featuredPitchMarch(Request $request)
    {
        return view('pitch.featured.march', [
            'is_logged' => Auth::check()
        ]);
    }

    public function featuredPitchFebruary(Request $request)
    {
        return view('pitch.featured.february', [
            'is_logged' => Auth::check()
        ]);
    }

    public function featuredPitchOctober(Request $request)
    {
        return view('pitch.featured.october', [
            'is_logged' => Auth::check()
        ]);
    }

    public function featuredPitchNovember(Request $request)
    {
        return view('pitch.featured.november', [
            'is_logged' => Auth::check()
        ]);
    }

    public function featuredPitchDecember(Request $request)
    {
        return view('pitch.featured.december', [
            'is_logged' => Auth::check()
        ]);
    }
}