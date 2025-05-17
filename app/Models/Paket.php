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
        'kategori',
        'penerima_paket',
        'asrama',
        'pengirim_paket',
        'isi_paket_yang_disita',
        'status',
    ];

    // public function santri()
    // {
    //     return $this->hasMany(Santri::class);
    // }
    public function santri()
    {
        return $this->belongsTo(Santri::class, 'penerima_paket', 'NIS', 'id_santri');
    }


    // public function kategori()
    // {
    //     return $this->hasMany(Kategori_Paket::class);
    // }
    public function kategori()
    {
        return $this->belongsTo(Kategori_Paket::class, 'kategori', 'id_kategori');
    }
    public function asrama()
    {
        return $this->belongsTo(Asrama::class, 'asrama', 'id_asrama');
    }
}
