<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Kategori_Paket extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'nama_kategori',
    ];

    public function pakets()
    {
        return $this->hasMany(Paket::class);
    }

}
