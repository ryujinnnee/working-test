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
        Schema::create('santris', function (Blueprint $table) {
            $table->string('NIS', 100)->primary();
            $table->string('nama_santri', 100);
            $table->string('alamat', 100);
            
            $table->unsignedBigInteger('id_asrama');

            $table->foreign('id_asrama')->references('id_asrama')->on('asramas')->onDelete('cascade');

            $table->integer('total_paket_diterima');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('santris');
    }
};
