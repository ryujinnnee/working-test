<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProfileUser extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'profile_users';

    protected $fillable = [
        'uuid',
        'user_id',
        'full_name',
        'birth_date',
        'is_valid',
        'address',
        'gender',
        'avatar',
        'doc'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    
    
        public function getAvatarUrlAttribute(): ?string
        {
            if ($this->avatar) {
                return Storage::url('avatars/' . $this->avatar);
            }

            return null;
        }
}

