<?php

namespace App\Http\Controllers\Admin\REST;

use App\Models\User;
use App\Repositories\Journalist\JournalistRepositoryInterface;
use App\Transformers\Pitches\UserPitchTransformer;
use App\Transformers\Users\Journalists\JournalistExtendedTransformer;
use App\Transformers\Users\Journalists\JournalistTransformer;
use App\Transformers\Users\UserTransformer;
use Illuminate\Contracts\Auth\PasswordBroker;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Carbon\Carbon;


class JournalistsRestController extends UserRestController
{
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */

    /**
     * @var JournalistRepositoryInterface
     */
    protected $journalistRepository;

    /**
     * JournalistsRestController constructor.
     * @param PasswordBroker $passwordBroker
     * @param JournalistRepositoryInterface $journalistRepository
     */
    public function __construct(PasswordBroker $passwordBroker, JournalistRepositoryInterface $journalistRepository)
    {
        parent::__construct($passwordBroker);
        $this->journalistRepository = $journalistRepository;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function index (Request $request) : JsonResponse
    {
        $journalists = $this
            ->journalistRepository
            ->setOrderBy('created_at', $request->input('sort', 'desc'))
            ->getAll();

        return new JsonResponse(transform($journalists, new JournalistExtendedTransformer()));
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function filteredIndex (Request $request) : JsonResponse
    {
        $dates = array($request->input('startDate'), $request->input('endDate'));
        $column = $request->input('column');
        $journalists = $this
            ->journalistRepository
            ->setOrderBy('created_at', $request->input('sort', 'desc'))
            ->getByDateFilter($dates, $column, 'journalist');

        return new JsonResponse(transform($journalists, new JournalistExtendedTransformer()));
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function search (Request $request) : JsonResponse
    {
        $journalists = $this->journalistRepository->search($request);
        return new JsonResponse(transform($journalists, new JournalistTransformer()));
    }

    /**
     * @param User $user
     * @return JsonResponse
     */
    public function show (User $user) : JsonResponse
    {
        return new JsonResponse(transform($user, new JournalistExtendedTransformer()));
    }

    /**
     * @param Request $request
     * @param User $user
     * @return JsonResponse
     */
    public function update (Request $request, User $user) : JsonResponse
    {
        $user = $this->journalistRepository->update($user, [
            'is_admin' => $request->input('user.isAdmin', false),
            'email' => $request->input('user.email', $user->email),
            'approved' => $request->input('user.approved', $user->approved)
        ]);

        return new JsonResponse(transform($user, new JournalistExtendedTransformer()));
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function newUsers (Request $request) : JsonResponse
    {
        $journalists = $this
            ->journalistRepository
            ->setOrderBy('created_at', $request->input('sort', 'desc'))
            ->getByCredentials(['approved' => null]);

           
           
        
        return new JsonResponse(transform($journalists, new JournalistExtendedTransformer()));

    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function approved (Request $request) : JsonResponse
    {
        
        $offset = 0;
        $perPage = 10;

        $paginate = $this
            ->journalistRepository
            ->setOrderBy('created_at', $request->input('sort', 'desc'))
            ->getByCredentials(['approved' => true], $perPage);

        if ($page = $request->input('page')) {
            $paginateJson = json_decode(json_encode($paginate));
            $offset = $paginateJson->per_page * ($paginateJson->current_page - 1);
        }

        $journalists = $this
            ->journalistRepository
            ->setOrderBy('created_at', $request->input('sort', 'desc'))
            ->getByCredentials(['approved' => true]);
            // temporary fix
            // ->splice($offset, $perPage);

            for($i = 0; $i < sizeof($journalists); $i++){
                $journalists[$i]['last_login'] = date("M d Y", strtotime($journalists[$i]['last_login']) );
                $journalists[$i]['daily_mail_time'] = date("M d Y", strtotime($journalists[$i]['created_at']->toDateTimeString()));               
              
            }
           
         
              
          return new JsonResponse([$paginate, transform($journalists, new JournalistExtendedTransformer())]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function denied (Request $request) : JsonResponse
    {
        $journalists = $this
            ->journalistRepository
            ->setOrderBy('created_at', $request->input('sort', 'desc'))
            ->getByCredentials(['approved' => false]);
        return new JsonResponse(transform($journalists, new JournalistExtendedTransformer()));
    }

    /**
     * @param User $user
     * @return JsonResponse
     */
    public function showInquiries (User $user) : JsonResponse
    {
        $inquiries = $user->inquiries;

        return new JsonResponse(transform($inquiries, new UserPitchTransformer()));
    }


    public function approvedhtml (Request $request) 
    {
       
            $offset = $request['page'];
            $perPage =  $request['total'] ;        

        $paginate = $this
            ->journalistRepository
            ->setOrderBy('created_at', $request->input('sort', 'desc'))
            ->getByCredentials(['approved' => true], $perPage);

        if ($page = $request->input('page')) {
            $paginateJson = json_decode(json_encode($paginate));
            $offset = $paginateJson->per_page * ($paginateJson->current_page - 1);
        }

        $journalists = $this
            ->journalistRepository
            ->setOrderBy('created_at', $request->input('sort', 'desc'))
            ->getByCredentials(['approved' => true])
            // temporary fix
            ->splice($offset, $perPage);

            $datas = transform($journalists, new JournalistExtendedTransformer())->toArray();  

            for($i = 0 ; $i < sizeof($datas) ; $i++){
                $datas[$i]['page'] = (int) $request['page'] ;
                $datas[$i]['total'] = (int) $request['total'] ;
            }

            //echo "<pre>"; print_r($datas); die();

        return view('journalist.approveadmin',compact('datas'));
    }


    
}
