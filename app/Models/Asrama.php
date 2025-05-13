<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Asrama extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'nama_asrama',
        'gedung'
    ];

    public function santri()
    {
        return $this->hasMany(Santri::class);
    }
}
