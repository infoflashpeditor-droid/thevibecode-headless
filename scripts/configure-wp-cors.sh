#!/bin/bash

# WordPress CORS Configuration Script
# This script adds CORS headers to wp-config.php for headless WordPress setup

WP_CONFIG_PATH="/path/to/your/wordpress/wp-config.php"
FRONTEND_URL="https://thevibecode.io"

# CORS configuration to add
CORS_CONFIG="
// Enable CORS for headless setup
add_action('init', function() {
    // Allow requests from your frontend domain
    \$allowed_origins = ['${FRONTEND_URL}', 'https://www.thevibecode.io'];
    \$origin = isset(\$_SERVER['HTTP_ORIGIN']) ? \$_SERVER['HTTP_ORIGIN'] : '';
    
    if (in_array(\$origin, \$allowed_origins)) {
        header('Access-Control-Allow-Origin: ' . \$origin);
    }
    
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    header('Access-Control-Allow-Credentials: true');
    
    // Handle preflight requests
    if (\$_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
});

// Enable CORS for REST API specifically
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function(\$value) {
        \$allowed_origins = ['${FRONTEND_URL}', 'https://www.thevibecode.io'];
        \$origin = isset(\$_SERVER['HTTP_ORIGIN']) ? \$_SERVER['HTTP_ORIGIN'] : '';
        
        if (in_array(\$origin, \$allowed_origins)) {
            header('Access-Control-Allow-Origin: ' . \$origin);
        }
        
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
        header('Access-Control-Allow-Credentials: true');
        
        return \$value;
    });
}, 15);
"

echo "WordPress CORS Configuration"
echo "============================"
echo ""
echo "Add the following code to your wp-config.php file:"
echo "Location: Before the line that says '/* That's all, stop editing! Happy publishing. */'"
echo ""
echo "$CORS_CONFIG"
echo ""
echo "Alternative: If you have SSH access to your WordPress server, you can run:"
echo "ssh your-server 'echo \"$CORS_CONFIG\" >> /path/to/your/wordpress/wp-config.php'"
echo ""
echo "Or use FTP/cPanel File Manager to edit wp-config.php manually."