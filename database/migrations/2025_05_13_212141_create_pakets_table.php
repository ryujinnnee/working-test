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
        Schema::create('pakets', function (Blueprint $table) {
            $table->id('id_paket');
            $table->string('nama_paket', 100);
            $table->date('tanggal_diterima');
        
            $table->unsignedBigInteger('kategori');
            $table->string('penerima_paket', 100);
            $table->unsignedBigInteger('asrama');
        
            $table->string('pengirim_paket', 100);
            $table->string('isi_paket_yang_disita', 200);
            $table->enum('status', ['diambil','Belum Diambil']);
        
            $table->timestamps();
            $table->softDeletes();
        
            $table->foreign('kategori')->references('id_kategori')->on('kategori__pakets');
            $table->foreign('penerima_paket')->references('NIS')->on('santris');
            $table->foreign('asrama')->references('id_asrama')->on('asramas');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pakets');
    }
};
