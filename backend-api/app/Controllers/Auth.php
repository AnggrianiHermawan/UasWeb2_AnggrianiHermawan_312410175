<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\UserModel;
use Firebase\JWT\JWT;

class Auth extends ResourceController
{
    protected $format = 'json';

    public function login()
    {
        $json = $this->request->getJSON();

        $username = $json->username ?? null;
        $password = $json->password ?? null;

        if (!$username || !$password) {
            return $this->fail('Username atau Password kosong');
        }

        $userModel = new \App\Models\UserModel();
        $user = $userModel->where('username', $username)->first();

        // Cek user & verifikasi password hash
        if (!$user || !password_verify($password, $user['password'])) {
            return $this->failUnauthorized('Username atau Password salah');
        }

        $key = getenv('JWT_SECRET') ?: 'rahasia_uas_super_aman_pemrograman_web_2_ci4';
        $payload = [
            "iat"      => time(),
            "exp"      => time() + 3600,
            "uid"      => $user['id'],
            "username" => $user['username']
        ];

        return $this->respond([
            'status' => true,
            'token'  => JWT::encode($payload, $key, 'HS256')
        ]);
    }

    public function register()
    {
        $userModel = new UserModel();

        $data = [
            'username' => $this->request->getVar('username'),
            'password' => password_hash($this->request->getVar('password'), PASSWORD_DEFAULT)
        ];

        $userModel->insert($data);

        return $this->respondCreated([
            'status'  => true,
            'message' => 'User baru berhasil didaftarkan'
        ]);
    }
}