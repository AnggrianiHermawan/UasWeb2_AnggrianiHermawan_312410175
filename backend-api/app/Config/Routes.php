<?php

namespace Config;

$routes = Services::routes();

$routes->get('/', 'Home::index');

// --- Endpoints Auth ---
$routes->post('register', 'Auth::register');
$routes->post('login', 'Auth::login');

// --- Endpoints Kategori & Barang (GET Public) ---
// Opsional: Jika kamu ingin tampilkan data tanpa login
$routes->get('kategori', 'Kategori::index');
$routes->get('kategori/(:num)', 'Kategori::show/$1');

// --- Endpoints Protected (POST, PUT, DELETE) ---
// Filter Auth akan jalan di sini
$routes->group('', ['filter' => 'auth'], function($routes) {
    
    // Rute Barang
    $routes->get('barang', 'Barang::index');
    $routes->post('barang', 'Barang::create');
    $routes->put('barang/(:num)', 'Barang::update/$1');
    $routes->delete('barang/(:num)', 'Barang::delete/$1');

    // Rute Kategori
    $routes->post('kategori', 'Kategori::create');
    $routes->put('kategori/(:num)', 'Kategori::update/$1');
    $routes->delete('kategori/(:num)', 'Kategori::delete/$1');
});