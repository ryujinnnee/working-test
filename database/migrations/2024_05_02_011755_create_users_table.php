<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('id_user', 11);
            $table->string('nama_user', 100);
            $table->string('username', 100)->unique();
            $table->string('password', 100);
            $table->unsignedBigInteger('id_role')->default(2); // Definisikan kolom foreign key
            $table->foreign('id_role')
                  ->references('id_role') // Referensikan kolom 'id_role' di tabel 'roles'
                  ->on('roles')           // Pada tabel 'roles'
                  ->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
