<?php

namespace App\Http\Controllers;

use App\Models\Paket;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function getPaketMasukHarian()
    {
        try {
            $jumlah = Paket::whereDate('tanggal_diterima', today())->count();
            return $jumlah;
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghitung jumlah paket masuk harian.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getPaketMasukMingguan()
    {
        try {
            $jumlah = Paket::whereBetween('tanggal_diterima', [now()->startOfWeek(), now()->endOfWeek()])->count();
            return $jumlah;
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghitung jumlah paket masuk mingguan.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function getPaketMasukBulanan()
    {
        try {
            $jumlah = Paket::whereBetween('tanggal_diterima', [now()->startOfWeek(), now()->endOfWeek()])->count();
            return $jumlah;
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghitung jumlah paket masuk mingguan.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function getKategoriPaketMasukHarian()
    {
        try {
            $data = Paket::whereDate('tanggal_diterima', today())
                ->join('kategori__pakets', 'pakets.kategori', '=', 'kategori__pakets.id_kategori')
                ->select('kategori__pakets.nama_kategori', DB::raw('count(*) as jumlah'))
                ->groupBy('kategori__pakets.nama_kategori')
                ->get();
            return $data;
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghitung jumlah kategori paket masuk harian.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    
    public function getKategoriPaketMasukMingguan()
    {
        try {
            $jumlah = Paket::whereMonth('tanggal_diterima', now()->week)
                ->whereYear('tanggal_diterima', now()->year)
                ->count();
            return $jumlah;
        } catch (\Exception $e) {
            \Log::error('Gagal mengambil data paket masuk bulanan: ' . $e->getMessage());
            return null;
        }
    }
    public function getKategoriPaketMasukBulanan()
    {
        try {
            $jumlah = Paket::whereMonth('tanggal_diterima', now()->month)
                ->whereYear('tanggal_diterima', now()->year)
                ->count();
            return $jumlah;
        } catch (\Exception $e) {
            \Log::error('Gagal mengambil data paket masuk bulanan: ' . $e->getMessage());
            return null;
        }
    }
    public function getKategoriPaketMasukTahunan()
    {
        try {
            $jumlah = Paket::whereMonth('tanggal_diterima', now()->year)
                ->whereYear('tanggal_diterima', now()->year)
                ->count();
            return $jumlah;
        } catch (\Exception $e) {
            \Log::error('Gagal mengambil data paket masuk bulanan: ' . $e->getMessage());
            return null;
        }
    }


    public function getPaketMasukTahunan()
    {
        try {
            $jumlah = Paket::whereYear('tanggal_diterima', now()->year)->count();
            return $jumlah;
        } catch (\Exception $e) {
            \Log::error('Gagal mengambil data paket masuk tahunan: ' . $e->getMessage());
            return null;
        }
    }

    public function get5PaketTerbaru()
    {
        try {
            $pakets = Paket::orderBy('created_at', 'desc')->limit(5)->get();
            return $pakets;
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil 5 paket terbaru.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function get5PaketKeluar()
    {
        try {
            $pakets = Paket::where('status', 'diambil')->orderBy('updated_at', 'desc')->limit(5)->get();
            return $pakets;
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil paket keluar.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getJumlahPaketBelumDiambil()
    {
        try {
            $jumlah = Paket::where('status', 'Belum Diambil')->count();
            return $jumlah;
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghitung jumlah paket belum diambil.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getJumlahPaketDisita()
    {
        try {
            $jumlah = Paket::whereNotNull('isi_paket_yang_disita')->where('isi_paket_yang_disita', '!=', '')->count();
            return $jumlah;
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghitung jumlah paket disita.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function getAllSeluruhJumlahPaket()
    {
        try {
            $jumlahPaket = Paket::count();
            return $jumlahPaket;
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghitung jumlah seluruh paket.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function index()
    {
        try {
            return response()->json([
                'success' => true,
                'grafik_paket_masuk' => [
                    'harian' => $this->getPaketMasukHarian(),
                    'mingguan' => $this->getPaketMasukMingguan(),
                    'bulanan' => $this->getPaketMasukBulanan(),
                    'tahunan' => $this->getPaketMasukTahunan(),
                ],
                'grafik_kategori_paket' => [
                    'harian' => $this->getKategoriPaketMasukHarian(),
                    'mingguan' => $this->getKategoriPaketMasukMingguan(),
                    'bulanan' => $this->getKategoriPaketMasukBulanan(),
                    'tahunan' => $this->getKategoriPaketMasukTahunan(),
                ],
                'paket_terbaru' => $this->get5PaketTerbaru(),
                'paket_keluar' => $this->get5PaketKeluar(),
                'jumlah_belum_diambil' => $this->getJumlahPaketBelumDiambil(),
                'jumlah_disita' => $this->getJumlahPaketDisita(),
                'jumlah_total' => $this->getAllSeluruhJumlahPaket(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data dashboard.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}