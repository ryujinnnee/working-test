<?php

namespace App\Exports;

use App\Models\Agenda;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithMapping;

class AgendasExport implements FromCollection, WithHeadings, ShouldAutoSize, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Agenda::all();
    }

    public function headings(): array
    {
        return [
            // 'ID',
            'UUID',
            'Dibuat Oleh',
            'Nama Agenda',
            'Berulang',
            'Waktu Mulai',
            'Waktu Selesai',
            'participants',
            'Dokumen',
            'Dibuat Pada',
            'Diperbarui Pada',
        ];
    }

    /**
     * @param Assignment $agendas
     * @return array
     */
    public function map($agendas): array
    {
        return [
            // $agendas->id,
            $agendas->uuid,
            $agendas->createdBy->id ?? null, // Asumsi ada relasi dengan User
            $agendas->agenda_name,
            $agendas->is_routine,
            $agendas->start_time, // Mengakses data JSON
            $agendas->end_time, // Mengakses data JSON
            $agendas->participants, // Mengakses data JSON
            $agendas->doc, // Mengakses data JSON
            $agendas->created_at,
            $agendas->updated_at,
        ];
    }
}
