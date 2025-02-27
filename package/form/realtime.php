<?php
namespace package\form;
use app\Nexa;

/**
 * Class classForm
 * Class for managing CRUD form operations including file uploads
 * Provides functionality to save, update, and delete form data
 * and handle file uploads with validation
 */
class realtime {
    /**
     * @var string Path to upload directory
     */
    private $uploadDir;

    /**
     * Constructor for initializing file upload configuration
     * Sets basic parameters for file uploads such as:
     * - Maximum file size limit (15MB)
     * - File storage directory
     * - Allowed file types (jpeg, png, pdf)
     * - Allowed file extensions
     */
    public function __construct() {
      
    }

    /**
     * Fetch data from demo table
     * @param array $data Request parameters
     * @return array Query results or error message
     */
     public function data($data) {
          return $this->handleDataRequest($data);
    }

    /**
     * Handle database data requests
     * Fetches user data from demo table with id, nama, and images columns
     * 
     * @param array $data Request parameters
     * @return array User data or error message if an error occurs
     */
    private function handleDataRequest($data) {
        try {
            Nexa::run(); 
            $user = Nexa::Brif('demo')
                ->select(['id', 'nama', 'images'])
                ->orderBy('id', 'DESC')
                ->get();

            // Add channel information for real-time updates
            return [
                'data' => $user,
                'channel' => 'demo-updates',  // Channel name for real-time updates
                'type' => 'nexa',
                'action' => 'data'
            ];
        } catch (\Exception $e) {
            error_log("Data fetch error: " . $e->getMessage());
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }


}
