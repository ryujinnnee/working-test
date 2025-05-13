<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;

class User extends Model implements AuthenticatableContract, JWTSubject
{
    use HasFactory, Authenticatable, HasApiTokens;
    use SoftDeletes;
    protected $table = 'users';

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    public function roles()
    {
        return $this->hasOne(Role::class);
    }
    public function userTypes()
    {
        return $this->hasOne(UserTypes::class);
    }
    
    public function profile()
    {
        return $this->hasOne(ProfileUser::class);
    }
    
    public function agendas()
    {
        return $this->belongsToMany(Agenda::class);
    }

    public function assignments()
    {
        return $this->belongsToMany(Assignment::class);
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    
}
