<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Paket extends Model
{
    use HasFactory, SoftDeletes;
    protected $primaryKey = 'id_paket';
    protected $fillable = [
        'nama_paket',
        'tanggal_diterima',
        'id_kategori',
        'penerima_paket',
        'asrama',
        'pengirim_paket',
        'isi_paket_yang_disita',
        'status',
    ];

    public function santri()
    {
        return $this->hasMany(Santri::class);
    }

    public function kategori()
    {
        return $this->hasMany(Kategori_Paket::class);
    }
}
