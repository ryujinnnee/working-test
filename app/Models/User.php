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
    protected $primaryKey = 'id_user';
    protected $fillable = [
        'nama_user',
        'username',
        'password',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class, 'id_role', 'id_role');
    }
    public function userTypes()
    {
        return $this->hasOne(UserTypes::class);
    }
    
    public function profile()
    {
        return $this->hasOne(ProfileUser::class);
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
