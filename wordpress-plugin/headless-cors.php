<?php
/**
 * Plugin Name: Headless WordPress CORS
 * Description: Enables CORS for headless WordPress setup with thevibecode.io
 * Version: 1.0.0
 * Author: The Vibe Code
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class HeadlessWordPressCORS {
    
    private $allowed_origins = [
        'https://thevibecode.io',
        'https://www.thevibecode.io',
        'http://localhost:3000', // For development
    ];
    
    public function __construct() {
        add_action('init', [$this, 'handle_cors']);
        add_action('rest_api_init', [$this, 'handle_rest_cors'], 15);
    }
    
    public function handle_cors() {
        $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
        
        if (in_array($origin, $this->allowed_origins)) {
            header('Access-Control-Allow-Origin: ' . $origin);
        }
        
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-WP-Nonce');
        header('Access-Control-Allow-Credentials: true');
        
        // Handle preflight requests
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit();
        }
    }
    
    public function handle_rest_cors($value) {
        remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
        add_filter('rest_pre_serve_request', function($value) {
            $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
            
            if (in_array($origin, $this->allowed_origins)) {
                header('Access-Control-Allow-Origin: ' . $origin);
            }
            
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
            header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-WP-Nonce');
            header('Access-Control-Allow-Credentials: true');
            
            return $value;
        });
        
        return $value;
    }
}

// Initialize the plugin
new HeadlessWordPressCORS();
?>