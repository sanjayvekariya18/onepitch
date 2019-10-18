<?php

namespace App\Repositories;

use App\Models\Industry;
use DB;

class IndustryRepository
{
	public static function getAll($filters, $limit = 12, $offset = 0) {
		$query = Industry::query()->orderBy('title', 'asc');

		if (isset($filters['term']) && $term = $filters['term']) {
			$query->where('title', 'LIKE', '%'.$term.'%')
				->orWhere('full_title', 'LIKE', '%'.$term.'%');
		}

		$tpl = getMultipleDataTemplate();
		$tpl['total'] = $query->count();

		if ($limit) {
			$offset = $limit * $offset;

			$query->limit($limit)
				->offset($offset);
		}

		$tpl['offset'] = $offset;
		$tpl['limit'] = $limit;
		$tpl['items'] = $query->get();

		return $tpl;
	}
}