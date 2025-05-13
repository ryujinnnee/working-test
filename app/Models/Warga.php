<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\SoftDeletes;

class Warga extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'nomor_kk', 'nama', 'alamat'
    ];
    public $incrementing = false;

    protected $keyType = 'string';

    public function pembayaran()
    {
        return $this->hasMany(Pembayaran::class);
    }

    protected static function booted()
    {
        static::creating(function ($warga) {
            $warga->id = Str::uuid()->toString();
        });
    }
}
