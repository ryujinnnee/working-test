<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\tagihan_master;
use App\Models\TagihanPeriode;
use App\Models\warga;
class GenerateTagihanPeriode extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate-tagihan-periode';

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
    $wargaList = warga::all(); // Ambil semua warga
    $tagihanList = tagihan_master::whereIn('quant', ['yearly', 'weekly', 'once'])->get(); // Ambil tagihan dengan quant 'yearly', 'weekly', atau 'once'

    foreach ($wargaList as $warga) {
        foreach ($tagihanList as $tagihan) { // Iterasi untuk setiap tagihan
            switch ($tagihan->quant) {
                case 'yearly':
                    // Untuk yearly, generate tagihan untuk 12 bulan
                    for ($i = 0; $i < 12; $i++) {
                        $periode = now()->startOfYear()->addMonths($i);
                        TagihanPeriode::updateOrCreate(
                            [
                                'warga_id' => $warga->id,
                                'tagihan_id' => $tagihan->id,
                                'periode' => $periode->startOfMonth(),
                            ],
                            ['status' => 'unpaid']
                        );
                    }
                    break;

                case 'weekly':
                    // Untuk weekly, generate tagihan untuk setiap minggu
                    for ($i = 0; $i < 4; $i++) { // Asumsi 52 minggu dalam setahun
                        $periode = now()->startOfMonth()->addWeeks($i);
                        TagihanPeriode::updateOrCreate(
                            [
                                'warga_id' => $warga->id,
                                'tagihan_id' => $tagihan->id,
                                'periode' => $periode->startOfWeek(),
                            ],
                            ['status' => 'unpaid']
                        );
                    }
                    break;

                case 'once':
                    // Untuk once, hanya generate satu tagihan untuk warga
                    $periode = now()->startOfMonth(); // Misalnya menggunakan tanggal saat ini
                    TagihanPeriode::updateOrCreate(
                        [
                            'warga_id' => $warga->id,
                            'tagihan_id' => $tagihan->id,
                            'periode' => $periode,
                        ],
                        ['status' => 'unpaid']
                    );
                    break;
            }
        }
    }

    $this->info('Tagihan berhasil di-generate untuk semua warga.');
}



}
