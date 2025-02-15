<?php
namespace package\form;
use app\Nexa;

/**
 * Class send
 * Kelas ini menangani pengiriman dan penyimpanan data formulir
 */
class send {
    /**
     * Constructor untuk kelas send
     * Dapat digunakan untuk inisialisasi koneksi database jika diperlukan
     */
    public function __construct() {
        // Initialize database connection jika diperlukan
    }

    /**
     * Menangani pengiriman data formulir
     * @param array $data Data formulir yang akan disimpan
     * @param array|null $uid Data user ID (opsional)
     * @return array Response dalam format yang telah ditentukan
     */
    public function formSend($data, $uid=null) {
        try {
            $this->saveData($data, $uid);
            // Simpan data form ke database
            return [
                'type' => 'formResponse',
                'status' => 'success',
                'data' => $data,
                'message' => 'Data berhasil disimpan'
            ];
        } catch (\Exception $e) {
            return [
                'type' => 'formResponse',
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }

    /**
     * Menyimpan data formulir ke database
     * @param array $data Data yang akan disimpan
     * @param array|null $uid Data user ID
     */
    protected function saveData($data, $uid) {
        Nexa::resetConnection(); 
        Nexa::Brif('demo')->insert([
            'userid' => $uid['id'],
            'nama' => $data['name']
        ]);
    }
}
