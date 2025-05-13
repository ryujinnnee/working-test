<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Insert user types
        DB::table('roles')->insert([
            ['nama_role' => 'administrator'],
            ['nama_role' => 'staff'],
            ['nama_role' => 'user'],
        ]);

        // Create admin user
        DB::table('users')->insert([
            'nama_user' => 'shin ryujin',
            'username' => 'ryujine',    
            'password' => Hash::make('password'),
            'id_role' => 1
        ]);
    }
}
