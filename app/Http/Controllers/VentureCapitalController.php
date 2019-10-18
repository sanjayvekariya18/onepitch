<?php

namespace App\Http\Controllers;

use App;
use App\Models\VwVentureCapitalistReport;
use App\Models\User;
use Carbon\Carbon;
use DB;
use Excel;
use Exception;
use Illuminate\Http\Request;
use Session;

class VentureCapitalController extends Controller
{
    public function __construct()
    {
        if (App::environment() === 'production') {
            abort(404);
        }
    }

    public function welcome()
    {
        return view('vc-comms.welcome');
    }

    public function finish()
    {
        return view('vc-comms.finish');
    }

    public function signup(Request $request)
    {
        $user = null;
        if (Session::get('journalist_id')) {
            $user = User::find(Session::get('journalist_id'));
        }

        if ($request->isMethod('post')) {
            $rules = array(
                'full_name' => 'required|max:100',
            );

            $data = [
                'full_name' => $request->input('full_name'),
                'company' => 'Venture Capital',
                'email' => str_random(10).'@mailinator.net',
                'publication_url' => 'onepitch.co',
                'author_url' => 'onepitch.co/vc/communications',
                'agree_tos' => 1,
                'password' => bcrypt('default'),
                'vc' => 1
            ];


            if ($this->validateInput($data, $rules)) {
                try {
                    DB::connection()->getPdo()->beginTransaction();

                    $data['role'] = User::ROLE_JOURNALIST;
                    if ($user) {
                        $user->edit($data);
                    } else {
                        $user = User::register($data);
                    }

                    Session::put('journalist_id', $user->id);

                    DB::connection()->getPdo()->commit();

                    return redirect()->route('journalist_interests');
                } catch (Exception $e) {
                    DB::connection()->getPdo()->rollBack();

                    abort(400, $e->getMessage());
                }
            }
        }

        return view('vc-comms.signup');
    }

    public function export()
    {
        $attributes = [
            'id' => 'ID',
            'full_name' => 'Name',
            'industry' => 'Industry',
            'topic' => 'Topic',
            'created_at' => 'Created at'
        ];

        $selectAttributes = array_keys($attributes);
        $customHeaders = array_values($attributes);
        $fileName = 'vc-comms-report_'.Carbon::now()->formatLocalized('%Y-%m-%d');
        $resultSet = VwVentureCapitalistReport::select($selectAttributes)->get()->toArray();

        Excel::create($fileName, function ($excel) use ($resultSet, $customHeaders) {

            $excel->sheet('VC Comms Users', function ($sheet) use ($resultSet, $customHeaders) {

                $sheet->setStyle([
                    'font' => [
                        'name' => 'Calibri',
                        'size' => 16
                    ]
                ]);

                $sheet->fromArray($resultSet, null, 'A1', true);

                // Manipulate Header Row
                $sheet->row(1, $customHeaders);
                $sheet->row(1, function ($row) {
                    $row->setBackground('#ffd732');
                    $row->setFontWeight('bold');
                });

                $sheet->setAutoFilter();
            });

        })->download('xlsx');
    }
}
