<?php

namespace App\Http\Controllers\Admin\REST;

use App\Http\Controllers\Controller;
use App\Models\Alert;
use App\Repositories\Alert\AlertRepositoryInterface;
use App\Transformers\Alerts\AlertTransformer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;


class AlertRestController extends Controller
{
    /**
     * Controller repository
     *
     * @var AlertRepositoryInterface
     */
    protected $alertRepository;

    /**
     * Main model for controller
     * @var Alert
     */
    protected $alert;

    /**
     * FaqsRestController constructor.
     *
     * @param AlertRepositoryInterface $alertRepository
     * @param Alert $alert
     */
    public function __construct(AlertRepositoryInterface $alertRepository, Alert $alert)
    {
        $this->alertRepository = $alertRepository;
        $this->alert = $alert;
    }

    /**
     * Retrieve all Alerts
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $sort = $request->input('sort', 'desc');
        $items = $this->alert->select('*');
        $resultSet = $items->orderBy('created_at', $sort)->get();

        return new JsonResponse(transform($resultSet, new AlertTransformer()));
    }

    /**
     *  Create new Alert item resource
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required_without:role|nullable|string',
            'role' => 'required_without:user_id|nullable|numeric|between:1,2',
            'message' => 'required|string',
            'link' => 'string|url|nullable',
        ]);

        $dataPost = $request->all();

        $this->alert->create($dataPost);

        return response()->json(['message' => 'OK']);
    }

    /**
     * Update Alert item resource
     *
     * @param Request $request
     * @param Alert $alert
     * @return JsonResponse
     */
    public function update(Request $request, Alert $alert)
    {
        $this->validate($request, [
            'user_id' => 'required_without:role|nullable|string',
            'role' => 'required_without:user_id|nullable|numeric|between:1,2',
            'message' => 'required|string',
            'link' => 'string|url|nullable',
        ]);

        $alert->fill($request->all())->save();

        return response()->json(['message' => 'OK']);
    }

    /**
     * Delete Alert item
     *
     * @param Alert $alert
     * @return JsonResponse
     */
    public function delete(Alert $alert)
    {
        try {
            $alert->delete();
        } catch (\Exception $exception) {
            return new JsonResponse(null, 500);
        }

        return new JsonResponse(null, 200);
    }
}
