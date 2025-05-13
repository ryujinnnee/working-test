<?php

namespace App\Exports;

use App\Models\ProfileUser;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithMapping;

class UsersProfileExport implements FromCollection, WithHeadings, ShouldAutoSize, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return ProfileUser::all();
    }

    public function headings(): array
    {
        return [
            // 'ID',
            'UUID',
            'Nama Lengkap',
            'Tanggal Lahir',
            'Valid',
            'Alamat',
            'Gender',
            'Profile Photo',
            'Dokumen ID',
            'Dibuat Pada',
            'Diperbarui Pada',
        ];
    }

    /**
     * @param Assignment $profile
     * @return array
     */
    public function map($profile): array
    {
        return [
            // $profile->id,
            $profile->uuid,
            $profile->createdBy->id ?? null,
            $profile->birth_date,
            $profile->is_valid,
            $profile->address,
            $profile->gender,
            $profile->profile_photo,
            $profile->doc_id,
            $profile->created_at,
            $profile->updated_at,
        ];
    }

}
