<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Santri extends Model
{
    use HasFactory, SoftDeletes;
    protected $primaryKey = 'NIS';       // Set primary key
    public $incrementing = false;        // Karena NIS bukan auto increment
    protected $keyType = 'string';

    protected $fillable = [
        'NIS',
        'nama_santri',
        'alamat',
        'id_asrama',
        'total_paket_diterima'
    ];

    public function asramas()
    {
        return $this->hasOne(Asrama::class);
    }
}
