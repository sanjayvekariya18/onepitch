<?php

namespace App\Http\Controllers;

use App\Models\IndustryKeyword;
use App\Models\Inquiry;
use App\Models\InquiryIndustry;
use App\Models\TopicKeyword;
use App\Models\User;
use App\Notifications\InquiryConfirm;
use App\Notifications\InquiryConfirmReminder;
use App\Notifications\PublicistConfirmEmail;
use App\Repositories\InquiryRepository;
use App\Services\DynamicRecommendationService;
use Auth;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;
use Session;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use DB;

class InquiryController extends Controller
{
    protected $user;
    protected $inquiry;

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

            if ($inquiry_id = Session::get('inquiry_id')) {
                $this->inquiry = Inquiry::find($inquiry_id);
                if ($this->inquiry && $this->user && $this->inquiry->user_id != $this->user->id) {
                    $this->inquiry = null;
                    Session::remove('inquiry_id');
                }
                if (!in_array($this->inquiry->status, Inquiry::getStatusesToEdit())) {
                    $this->inquiry = null;
                    Session::remove('inquiry_id');
                }
            }

            return $next($request);
        });
    }

    public function what(Request $request, $inquiry_id = null)
    {
        $user = $this->user;
        $inquiry = null;

        $landingEntity = Session::get('landing_entity');

        if(!empty($landingEntity)){
            Session::remove('landing_entity');
        }

        if ($inquiry_id == 'create') {
            $inquiry = null;
            $this->inquiry = null;
            Session::remove('inquiry_id');
            $inquiry_id = null;
        }
        if ($inquiry_id) {
            $inquiry = Inquiry::find($inquiry_id);
            if (($inquiry && $inquiry->user_id != $user->id) || !in_array($inquiry->status, Inquiry::getStatusesToEdit())) {
                $inquiry = null;
                $this->inquiry = null;
            }
        }
        if (!$inquiry) {
            $inquiry = $this->inquiry;
        }
        if ($inquiry) {
            Session::put('inquiry_id', $inquiry->id);
        } else {
            Session::remove('inquiry_id');
        }

        if ($request->isMethod('post')) {
            $rules = array(
                'subject' => 'required|max:40',
                'company' => 'required',
                'website' => 'string|max:255|nullable',
                'points' => 'required|array',
                'points.*' => 'max:280',
            );


            $data = $request->input();

            if ($this->validateInput($data, $rules)) {
                try {
                    DB::connection()->getPdo()->beginTransaction();

                    if (!$inquiry) {
                        $inquiry = new Inquiry();
                        $inquiry->user_id = $user->id;
                    }

                    $inquiry->subject = $data['subject'];
                    $inquiry->company = $data['company'];
                    $inquiry->website = $data['website'];

                    $points = [];
                    $i = 1;
                    foreach ($data['points'] as $point) {
                        if ($point) {
                            $points['what_point_' . $i] = $point;
                            $i++;
                        }
                    }
                    $inquiry->fill($points);
                    $inquiry->save();

                    if ($request->hasFile('file_1')) {
                        $file = $request->file('file_1');
                        $name = time() . $file->getClientOriginalName();
                        $filePath = 'inquiry/' . $name;
                        Storage::disk('s3')->put($filePath, file_get_contents($file));

                        if ($inquiry->files[0]) {
//                          $oldUrl = $inquiry->files[0]->url;
//                          Storage::disk('s3')->delete($oldUrl);
                            $inquiry->files[0]->update(['url' => $filePath, 'name' => $file->getClientOriginalName()]);
                        } else {
                            $inquiry->files()->create(['url' => $filePath, 'name' => $file->getClientOriginalName()]);
                        }
                    }

                    if ($request->hasFile('file_2')) {
                        $file = $request->file('file_2');
                        $name = time() . $file->getClientOriginalName();
                        $filePath = 'inquiry/' . $name;
                        Storage::disk('s3')->put($filePath, file_get_contents($file));

                        if ($inquiry->files[1]) {
//                          $oldUrl = $inquiry->files[1]->url;
//                          Storage::disk('s3')->delete($oldUrl);
                            $inquiry->files[1]->update(['url' => $filePath, 'name' => $file->getClientOriginalName()]);
                        } else {
                            $inquiry->files()->create(['url' => $filePath, 'name' => $file->getClientOriginalName()]);
                        }
                    }

                    if ($request->hasFile('file_3')) {
                        $file = $request->file('file_3');
                        $name = time() . $file->getClientOriginalName();
                        $filePath = 'inquiry/' . $name;
                        Storage::disk('s3')->put($filePath, file_get_contents($file));

                        if ($inquiry->files[2]) {
//                          $oldUrl = $inquiry->files[2]->url;
//                          Storage::disk('s3')->delete($oldUrl);
                            $inquiry->files[2]->update(['url' => $filePath, 'name' => $file->getClientOriginalName()]);
                        } else {
                            $inquiry->files()->create(['url' => $filePath, 'name' => $file->getClientOriginalName()]);
                        }
                    }

                    $inquiry->save();

                    $deletedFiles = explode(',', $request->input('deleted_files'));

                    foreach ($deletedFiles as $deletedFile) {
                        $inquiryFile = $inquiry->files->where('name', $deletedFile)->first();
                        if ($inquiryFile) {
//                              Storage::disk('s3')->delete($inquiryFile->url);
                            $inquiryFile->delete();
                        }
                    }

                    // Not best practice but would solve updating tour
                    if (Carbon::now()->diffInMinutes($this->user->tour->updated_at) > 1 && $user->tour->inquiry_what < 3) {
                        $request['type'] = 'inquiry_what';
                        $request['increment'] = 1;

                        $service = new ServiceController();
                        $service->updateUserTour($request);
                    }

                    Session::put('inquiry_id', $inquiry->id);

                    DB::connection()->getPdo()->commit();

                    return redirect()->route('inquiry_why');
                } catch (\Exception $e) {
                    DB::connection()->getPdo()->rollBack();

                    abort(400, $e->getMessage());
                }
            }
        }

        return view('inquiry.what', array(
            'inquiry' => $inquiry,
        ));
    }

    public function why(Request $request, $inquiry_id = null)
    {
        $user = $this->user;
        $inquiry = null;
        if ($inquiry_id == 'create') {
            $inquiry = null;
            $this->inquiry = null;
            Session::remove('inquiry_id');
            $inquiry_id = null;
        }
        if ($inquiry_id) {
            $inquiry = Inquiry::find($inquiry_id);
            if (($inquiry && $inquiry->user_id != $user->id) || !in_array($inquiry->status, Inquiry::getStatusesToEdit())) {
                $inquiry = null;
                $this->inquiry = null;
            }
        }
        if (!$inquiry) {
            $inquiry = $this->inquiry;
        }
        if (!$inquiry) {
            return redirect()->route('inquiry_what');
        }
        Session::put('inquiry_id', $inquiry->id);

        if ($request->isMethod('post')) {
            $rules = array(
                'points' => 'required|array',
                'points.*' => 'max:280',
            );
            $data = $request->input();

            if ($this->validateInput($data, $rules)) {
                try {
                    DB::connection()->getPdo()->beginTransaction();

                    $points = [];
                    $i = 1;
                    foreach ($data['points'] as $point) {
                        if ($point) {
                            $points['why_point_' . $i] = $point;
                            $i++;
                        }
                    }
                    $inquiry->fill($points);
                    $inquiry->save();

                    // Not best practice but would solve updating tour
                    if (Carbon::now()->diffInMinutes($this->user->tour->updated_at) > 1 && $user->tour->inquiry_why < 3) {
                        $request['type'] = 'inquiry_want';
                        $request['increment'] = 1;

                        $service = new ServiceController();
                        $service->updateUserTour($request);
                    }

                    DB::connection()->getPdo()->commit();

                    return redirect()->route('inquiry_where');
                } catch (\Exception $e) {
                    DB::connection()->getPdo()->rollBack();

                    abort(400, $e->getMessage());
                }
            }
        }

        return view('inquiry.why', array(
            'inquiry' => $inquiry,
        ));
    }

    public function where(Request $request, $inquiry_id = null)
    {
        $user = $this->user;
        $inquiry = null;
        if ($inquiry_id == 'create') {
            $inquiry = null;
            $this->inquiry = null;
            Session::remove('inquiry_id');
            $inquiry_id = null;
        }
        if ($inquiry_id) {
            $inquiry = Inquiry::find($inquiry_id);
            if (($inquiry && $inquiry->user_id != $user->id) || !in_array($inquiry->status, Inquiry::getStatusesToEdit())) {
                $inquiry = null;
                $this->inquiry = null;
            }
        }
        if (!$inquiry) {
            $inquiry = $this->inquiry;
        }
        if (!$inquiry) {
            return redirect()->route('inquiry_what');
        }
        Session::put('inquiry_id', $inquiry->id);

        // Dynamic Recommendations
        $inquiryCollection = [$inquiry->subject, $inquiry->what_point_1, $inquiry->why_point_1, $inquiry->why_point_2, $inquiry->why_point_3];
        $inquiryString = str_replace('"', '', implode(" - ", $inquiryCollection));

        $industryRecommendations = collect([]);
        $topicRecommendations = collect([]);
        $industryRecommended = [];
        $topicRecommended = [];
        $words = [];

        $dynamic = new DynamicRecommendationService();

        $industryMatches = collect(\DB::select('SELECT keyword FROM industry_keywords WHERE "' . $inquiryString . '" LIKE CONCAT(\'%\', keyword, \'%\')'))->pluck('keyword');
        $topicMatches = collect(\DB::select('SELECT keyword FROM topic_keywords WHERE "' . $inquiryString . '" LIKE CONCAT(\'%\', keyword, \'%\')'))->pluck('keyword');
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

        $keywordRecommendations = $dynamic->getKeywordsRecommendations($inquiryCollection);

        $recommendations['industry'] = $recommendations['industry']->merge($keywordRecommendations['industry'])->unique('industry_id')->take(5)->pluck('industry');
        $recommendations['topic'] = $recommendations['topic']->merge($keywordRecommendations['topic'])->unique('industry_topic_id')->take(5)->pluck('topic');

        foreach ($recommendations['industry'] as $value) {
            $industryRecommended[$value->id] = $value->title;
        }

        foreach ($recommendations['topic'] as $value) {
            $topicRecommended[$value->id] = $value->title;
        }

        $selected_industry = $inquiry->listIndustriesWithTopics();

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
                        return redirect()->route('inquiry_where');
                    }

                    InquiryIndustry::setIndustries($inquiry, $industries);

                    if ($inquiry->status == Inquiry::STATUS_DRAFT) {
                        $inquiry->confirmation_code = sha1(str_random(20) . time());
                    }
                    $inquiry->save();

                    // Not best practice but would solve updating tour
                    if (Carbon::now()->diffInMinutes($this->user->tour->updated_at) > 1 && $user->tour->inquiry_where < 3) {
                        $request['type'] = 'inquiry_where';
                        $request['increment'] = 1;

                        $service = new ServiceController();
                        $service->updateUserTour($request);
                    }

                    DB::connection()->getPdo()->commit();

                    if ($inquiry->status == Inquiry::STATUS_DRAFT) {
                        $user->notify(new InquiryConfirm($inquiry));
                    }

                    return redirect()->route('inquiry_finish');
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
            'inquiry' => $inquiry,
            'selected_industry' => $selected_industry,
            'industryRecommendations' => $industryRecommended,
            'topicRecommendations' => $topicRecommended,
            'landedTopicId' => !empty($landedTopicId) ? $landedTopicId : 0,
            'landedIndustryId' => !empty($landedIndustryId) ? $landedIndustryId : 0,
        );

        return view('inquiry.where', $dataView);
    }

    public function saveAsDraft(Request $request, $inquiry_id = null)
    {
        $user = $this->user;
        $inquiry = null;
        if ($inquiry_id) {
            $inquiry = Inquiry::find($inquiry_id);
            if (($inquiry && $inquiry->user_id != $user->id) || !in_array($inquiry->status, Inquiry::getStatusesToEdit())) {
                $inquiry = null;
                $this->inquiry = null;
            }
        }
        $data = $request->input();

        switch ($data['step']) {
            case 1:
                try {
                    DB::connection()->getPdo()->beginTransaction();

                    if (!$inquiry) {
                        $inquiry = new Inquiry();
                        $inquiry->user_id = $user->id;
                    }

                    $inquiry->subject = $data['subject'];
                    $inquiry->company = $data['company'];
                    $inquiry->website = $data['website'];

                    $points = [];
                    $i = 1;
                    foreach ($data['points'] as $point) {
                        if ($point) {
                            $points['what_point_' . $i] = $point;
                            $i++;
                        }
                    }
                    $inquiry->fill($points);
                    $inquiry->save();

                    if ($request->hasFile('file_1')) {
                        $file = $request->file('file_1');
                        $name = time() . $file->getClientOriginalName();
                        $filePath = 'inquiry/' . $name;
                        Storage::disk('s3')->put($filePath, file_get_contents($file));

                        if ($inquiry->files[0]) {
//                          $oldUrl = $inquiry->files[0]->url;
//                          Storage::disk('s3')->delete($oldUrl);
                            $inquiry->files[0]->update(['url' => $filePath, 'name' => $file->getClientOriginalName()]);
                        } else {
                            $inquiry->files()->create(['url' => $filePath, 'name' => $file->getClientOriginalName()]);
                        }
                    }

                    if ($request->hasFile('file_2')) {
                        $file = $request->file('file_2');
                        $name = time() . $file->getClientOriginalName();
                        $filePath = 'inquiry/' . $name;
                        Storage::disk('s3')->put($filePath, file_get_contents($file));

                        if ($inquiry->files[1]) {
//                          $oldUrl = $inquiry->files[1]->url;
//                          Storage::disk('s3')->delete($oldUrl);
                            $inquiry->files[1]->update(['url' => $filePath, 'name' => $file->getClientOriginalName()]);
                        } else {
                            $inquiry->files()->create(['url' => $filePath, 'name' => $file->getClientOriginalName()]);
                        }
                    }

                    if ($request->hasFile('file_3')) {
                        $file = $request->file('file_3');
                        $name = time() . $file->getClientOriginalName();
                        $filePath = 'inquiry/' . $name;
                        Storage::disk('s3')->put($filePath, file_get_contents($file));

                        if ($inquiry->files[2]) {
//                          $oldUrl = $inquiry->files[2]->url;
//                          Storage::disk('s3')->delete($oldUrl);
                            $inquiry->files[2]->update(['url' => $filePath, 'name' => $file->getClientOriginalName()]);
                        } else {
                            $inquiry->files()->create(['url' => $filePath, 'name' => $file->getClientOriginalName()]);
                        }
                    }

                    $inquiry->save();

                    $deletedFiles = explode(',', $request->input('deleted_files'));

                    foreach ($deletedFiles as $deletedFile) {
                        $inquiryFile = $inquiry->files->where('name', $deletedFile)->first();
                        if ($inquiryFile) {
//                              Storage::disk('s3')->delete($inquiryFile->url);
                            $inquiryFile->delete();
                        }
                    }

                    // Not best practice but would solve updating tour
                    if (Carbon::now()->diffInMinutes($this->user->tour->updated_at) > 1 && $user->tour->inquiry_what < 3) {
                        $request['type'] = 'inquiry_what';
                        $request['increment'] = 1;

                        $service = new ServiceController();
                        $service->updateUserTour($request);
                    }

                    Session::put('inquiry_id', $inquiry->id);

                    DB::connection()->getPdo()->commit();

                    return redirect()->route('inquiry_why');
                } catch (\Exception $e) {
                    DB::connection()->getPdo()->rollBack();

                    abort(400, $e->getMessage());
                }
                break;
            case 2:
                try {
                    DB::connection()->getPdo()->beginTransaction();

                    $points = [];
                    $i = 1;
                    foreach ($data['points'] as $point) {
                        if ($point) {
                            $points['why_point_' . $i] = $point;
                            $i++;
                        }
                    }
                    $inquiry->fill($points);
                    $inquiry->save();

                    // Not best practice but would solve updating tour
                    if (Carbon::now()->diffInMinutes($this->user->tour->updated_at) > 1 && $user->tour->inquiry_why < 3) {
                        $request['type'] = 'inquiry_want';
                        $request['increment'] = 1;

                        $service = new ServiceController();
                        $service->updateUserTour($request);
                    }

                    DB::connection()->getPdo()->commit();

                    return redirect()->route('inquiry_where');
                } catch (\Exception $e) {
                    DB::connection()->getPdo()->rollBack();

                    abort(400, $e->getMessage());
                }
                break;
            case 3:
                try {
                    DB::connection()->getPdo()->beginTransaction();

                    $industries = [];
                    foreach ($request->input('industry') as $industry) {
                        $industries[] = json_decode($industry, true);
                    }

                    if (!is_array($industries)) {
                        return redirect()->route('inquiry_where');
                    }

                    InquiryIndustry::setIndustries($inquiry, $industries);

                    if ($inquiry->status == Inquiry::STATUS_DRAFT) {
                        $inquiry->confirmation_code = sha1(str_random(20) . time());
                    }
                    $inquiry->save();

                    DB::connection()->getPdo()->commit();

                    return redirect()->route('inquiry_where');
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
        $inquiry = $this->inquiry;

        if (!$inquiry) {
            return redirect()->route('inquiry_what');
        }

        Session::remove('publicist_id');
        Session::remove('inquiry_id');
        return view('inquiry.finish', array(
            'user' => $user,
            'inquiry' => $inquiry,
        ));
    }

    public function publicistNoInquiry(Request $request)
    {
        $user = $this->user;
        Session::remove('publicist_id');

        return view('inquiry.no_inquiry', array(
            'user' => $user,
        ));
    }

    public function publicistSave(Request $request, $user_id, $code)
    {
        try {
            $inquiry = Inquiry::where('confirmation_code', $code)->firstOrFail();
            $user = User::findOrFail($user_id);

            if ($inquiry->status > Inquiry::STATUS_NEW && !$user->saved_inquiries()->where('inquiry_id',
                    $inquiry->id)->count()) {

                $user->saved_inquiries()->create(['inquiry_id' => $inquiry->id]);

                if (!$inquiry->mail_clicks()->where('user_id', $user->id)->count()) {
                    $inquiry->mail_clicks()->create(['user_id' => $user->id]);
                }

                $inquiry->increment('clicks');

                Session::flash('saved_inquiry_id', $inquiry->id);
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
        $inquiry = Inquiry::getOneBy('confirmation_code', $code);

        if ($inquiry) {
            $user = $inquiry->user;
            if ($inquiry->status == Inquiry::STATUS_DRAFT) {
                Session::flash('confirmed_inquiry_id', $inquiry->id);
            }

            $inquiry->status = Inquiry::STATUS_NEW;
            $inquiry->uploaded_at = date('Y-m-d H:i:s');
            $inquiry->save();

            if (!$user->is_verified) {
                $user->is_verified = 1;
                $user->verification_code = null;
                $user->save();
            }

            Auth::login($user);

            return redirect()->route('profile');
        }

        return response('Wrong inquiry');
    }

    public function cancel(Request $request, $code)
    {
        $inquiry = Inquiry::getOneBy('confirmation_code', $code);

        if ($inquiry) {
            $user = $inquiry->user;

            if ($inquiry->status != Inquiry::STATUS_DRAFT) {
                Session::flash('cancelled_inquiry_id', $inquiry->id);
            }

            $inquiry->status = Inquiry::STATUS_DRAFT;
            $inquiry->save();

            Auth::login($user);

            return redirect()->route('profile');
        }

        return response('Wrong inquiry');
    }

    public function edit(Request $request, $code)
    {
        $inquiry = Inquiry::getOneBy('confirmation_code', $code);

        if ($inquiry) {
            $user = $inquiry->user;

            Auth::login($user);

            return redirect()->route('inquiry_what', $inquiry->id);
        }

        return response('Wrong inquiry');
    }

    public function delete(Request $request, $inquiry_id)
    {
        $inquiry = Inquiry::find($inquiry_id);

        if ($inquiry && $inquiry->user_id == Auth::user()->id) {
            try {
                DB::connection()->getPdo()->beginTransaction();

                $inquiry->remove();

                DB::connection()->getPdo()->commit();
            } catch (\Exception $e) {
                DB::connection()->getPdo()->rollBack();
            }
        }

        return response('');
    }

    public function loadInquiries(Request $request)
    {
        $limit = 5;
        $filters['term'] = $request->input('term');
        $offset = $request->input('offset', 0);
        $user = Auth::user();
        $filters['user'] = $user;
        $inquiries = InquiryRepository::getAll($filters, $limit, $offset);

        $showing = $limit * $offset + count($inquiries['items']);

        return view('inquiry.inquiries_table_rows', array(
            'inquiries' => $inquiries,
            'offset' => $offset,
            'user' => $user,
            'limit' => $limit,
            'showing' => $showing,
        ));
    }

    public function loadSavedInquiries(Request $request)
    {
        $limit = 5;
        $filters['term'] = $request->input('term');
        $offset = $request->input('offset', 0);
        $user = Auth::user();
        $filters['user'] = $user;
        $filters['saved_inquiries'] = $user->saved_inquiries;
        $inquiries['items'] = $user->saved_inquiries->load('inquiry')->pluck('inquiry')->splice($offset, $limit);
        $inquiries['total'] = count($filters['saved_inquiries']); //InquiryRepository::getAll($filters, $limit, $offset);

        $showing = $limit * $offset + count($inquiries['items']);

        return view('inquiry.inquiries_saved_table_rows', array(
            'inquiries' => $inquiries,
            'offset' => $offset,
            'user' => $user,
            'limit' => $limit,
            'showing' => $showing,
        ));
    }

    public function loadInquiriesHistory(Request $request)
    {
        $limit = 5;
        $filters['term'] = $request->input('term');
        $offset = $request->input('offset', 0);
        $user = Auth::user();
        $filters['user'] = $user;
        $filters['saved_inquiries'] = $user->inquiry_logs;
        $inquiries['items'] = $user->inquiry_logs->load('inquiry')->pluck('inquiry')->splice($offset, $limit); //InquiryRepository::getAll($filters, $limit, $offset);
        $inquiries['total'] = count($filters['saved_inquiries']);

        $showing = $limit * $offset + count($inquiries['items']);

        return view('inquiry.inquiries_history_table_rows', array(
            'inquiries' => $inquiries,
            'offset' => $offset,
            'user' => $user,
            'limit' => $limit,
            'showing' => $showing,
        ));
    }

    public function viewModal(Request $request)
    {
        $inquiryId = $request->input('inquiry_id');

        try {
            $user = Auth::user();
            $inquiry = Inquiry::findOrFail($inquiryId);
            $inquiry->load('saved_inquiries.user');
            $indstrs_data = $inquiry->listIndustriesAndTopics();
            $savedInquiries = $inquiry->saved_inquiries;

            return view('inquiry.view_modal', array(
                'inquiry' => $inquiry,
                'indstrs_data' => $indstrs_data,
                'savedInquiries' => $savedInquiries,
                'user' => $user,
            ));
        } catch (ModelNotFoundException $e) {
            return response('');

        } catch (\Exception $e) {
            return response('');
        }
    }
}