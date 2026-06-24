<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class CorsFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        // Header CORS
        header('Access-Control-Allow-Origin: http://127.0.0.1:5500');
        // atau kalau mau bebas:
        // header('Access-Control-Allow-Origin: *');

        header('Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Authorization');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');

        // Untuk preflight OPTIONS: balas 200 dan hentikan di sini
        if (strtoupper($request->getMethod()) === 'OPTIONS') {
            http_response_code(200);
            exit(0);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // bisa dikosongkan
    }
}