<?php

namespace App\Exports;

use App\Models\Assignment;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithMapping;

class AssignmentsExport implements FromCollection, WithHeadings, ShouldAutoSize, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Assignment::all(); // Atau query data sesuai kebutuhan Anda
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        return [
            // 'ID',
            'UUID',
            'Untuk',
            'Judul',
            'Deskripsi (Agenda)',
            'Deskripsi (Lokasi)',
            'Deadline',
            'Status',
            'Dibuat Oleh',
            'Dibuat Pada',
            'Diperbarui Pada',
        ];
    }

    /**
     * @param Assignment $assignment
     * @return array
     */
    public function map($assignment): array
    {
        return [
            // $assignment->id,
            $assignment->uuid,
            $assignment->for,
            $assignment->title,
            $assignment->desc['agenda'] ?? null, // Mengakses data JSON
            $assignment->desc['lokasi'] ?? null, // Mengakses data JSON
            $assignment->deadline,
            $assignment->status ? 'Aktif' : 'Tidak Aktif',
            $assignment->createdBy->id ?? null, // Asumsi ada relasi dengan User
            $assignment->created_at,
            $assignment->updated_at,
        ];
    }
}