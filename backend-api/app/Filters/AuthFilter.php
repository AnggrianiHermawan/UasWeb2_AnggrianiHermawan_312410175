<?php
namespace App\Filters;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;

class AuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $key = getenv('JWT_SECRET') ?: 'rahasia_uas_super_aman_pemrograman_web_2_ci4';
        $header = $request->getServer('HTTP_AUTHORIZATION');

        if (!$header) {
            return \Config\Services::response()->setJSON(['error' => 'Token Required'])->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED);
        }

        $token = explode(' ', $header)[1] ?? null;

        try {
            JWT::decode($token, new Key($key, 'HS256'));
        } catch (Exception $e) {
            return \Config\Services::response()->setJSON(['error' => 'Invalid or Expired Token'])->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null) {}
}