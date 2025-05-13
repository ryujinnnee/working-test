<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Santri extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'nama_santri',
        'alamat',
        'asrama',
        'total_paket_diterima'
    ];

    public function asramas()
    {
        return $this->hasOne(Asrama::class);
    }
}
