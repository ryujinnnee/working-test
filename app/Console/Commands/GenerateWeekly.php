<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\tagihan_master;
use App\Models\TagihanPeriode;
use App\Models\warga;
class GenerateWeekly extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate-weekly';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            $wargaList = warga::all(); // Ambil semua data warga
            $tagihan = tagihan_master::where('quant', 'weekly')->get(); // Ambil tagihan tahunan (sekali setahun)

            foreach ($wargaList as $warga) {
                // Hanya generate sekali dalam setahun
                $periode = now()->startOfYear(); // Mulai dari awal tahun
                TagihanPeriode::updateOrCreate(
                    [
                        'warga_id' => $warga->id,
                        'tagihan_id' => $tagihan->id,
                        'periode' => $periode,
                    ],
                    ['status' => 'unpaid']
                );
            }

            return response()->json(['message' => 'Tagihan tahunan berhasil digenerate untuk semua warga.'], 200);

        } catch (Exception $e) {
            return response()->json(['error' => 'Terjadi kesalahan: ' . $e->getMessage()], 500);
        }
    }
}
