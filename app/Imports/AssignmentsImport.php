<?php

namespace App\Imports;

use App\Models\Assignment;
use Maatwebsite\Excel\Concerns\ToModel;

class AssignmentsImport implements ToModel
{
    public function model(array $row)
    {
        return new Assignment([
            'for' => $row[0],
            'title' => $row[1],
            'desc' => $row[2], // Pastikan format sesuai
            'deadline' => $row[3],
            'status' => $row[4],
            'created_by' => auth()->id() ?? 1,
        ]);
    }
}

