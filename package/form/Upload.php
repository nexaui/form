<?php
namespace package\form;
use app\Nexa;

/**
 * Class send
 * Kelas untuk menangani pengiriman dan penyimpanan data formulir
 * Mendukung upload file dan penyimpanan ke database
 */
class send {
    /**
     * Inisialisasi konfigurasi upload file
     * Mengatur batasan ukuran file, direktori upload, dan tipe file yang diizinkan
     */
    public function __construct() {
        // Konfigurasi upload file melalui Nexa
        Nexa::configureFileUpload([
            'maxSize' => 15 * 1024 * 1024, // 15MB
            'uploadDir' => __DIR__ . '/uploads/',
            'allowedTypes' => [
                'image/jpeg',
                'image/png',
                'application/pdf'
            ],
            'allowedExtensions' => ['jpg', 'jpeg', 'png', 'pdf']
        ]);
    }

    /**
     * Menangani pengiriman data formulir tanpa file
     * @param array $data Data formulir (nama dan field lainnya)
     * @param array|null $uid Data user (berisi id pengguna)
     * @return array Response berisi status dan pesan hasil penyimpanan
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
     * Menangani pengiriman data formulir dengan file upload
     * @param array $data Data formulir termasuk file attachment
     * @param array $uid Data user yang berisi id pengguna
     * @return array Response berisi status, data form, info file, dan pesan
     */
    public function formUploads($data,$uid) {
        try {
            // Handle file upload jika ada
            $fileInfo = $this->handleAttachment($data);
            // Simpan ke database atau file
            $this->saveFile($data,$fileInfo, $uid);
        
            // Gunakan NexaBrif untuk insert
            

            return [
                'type' => 'formResponse',
                'status' => 'success',
                'data' => [
                    'form' => $data,
                    'file' => $fileInfo
                ],
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
     * Memproses upload file attachment
     * Menggunakan Nexa untuk validasi dan penyimpanan file
     * 
     * @param array $data Data form yang berisi informasi file attachment
     * @return array|null Informasi file yang berhasil diupload atau null jika tidak ada file
     * @throws \Exception Jika terjadi kesalahan saat upload
     */
    protected function handleAttachment($data) {
        if (!empty($data['attachment']) && isset($data['attachment']['content'])) {
            try {
                return Nexa::uploadFile($data['attachment']);
            } catch (\Exception $e) {
                // Log error jika diperlukan
                throw $e;
            }
        }
        return null;
    }

    /**
     * Menyimpan data formulir basic ke database
     * Menggunakan Nexa Brif untuk operasi insert
     * 
     * @param array $data Data formulir (minimal berisi field 'name')
     * @param array|null $uid Data user yang berisi id pengguna
     */
    protected function saveData($data, $uid) {
        Nexa::resetConnection(); 
        Nexa::Brif('demo')->insert([
            'userid' => $uid['id'],
            'nama' => $data['name']
        ]);
    }

    /**
     * Menyimpan data formulir dengan file ke database
     * Menyimpan referensi path file dan data form
     * 
     * @param array $data Data formulir (minimal berisi field 'name')
     * @param array $path Informasi path file yang telah diupload
     * @param array $uid Data user yang berisi id pengguna
     */
    protected function saveFile($data,$path, $uid) {
        Nexa::resetConnection(); 
        Nexa::Brif('demo')->insert([
            'userid' => $uid['id'],
            'images' =>$path['path'],
            'nama' => $data['name']
        ]);
    }
}
