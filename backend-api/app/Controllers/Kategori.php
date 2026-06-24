<?php
namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use App\Models\KategoriModel;

class Kategori extends ResourceController
{
    protected $modelName = KategoriModel::class;
    protected $format    = 'json';

    public function index()
    {
        return $this->respond($this->model->findAll());
    }

    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) return $this->failNotFound('Kategori tidak ditemukan');
        return $this->respond($data);
    }

    public function create()
{
    $kategoriModel = new KategoriModel();
    
    // Mengambil data JSON yang dikirim
    $data = [
        'nama_kategori' => $this->request->getVar('nama_kategori')
    ];

    // Cek apakah data kosong
    if (empty($data['nama_kategori'])) {
        return $this->fail('Data nama_kategori tidak ditemukan');
    }

    $kategoriModel->insert($data);

    return $this->respondCreated([
        'status' => true,
        'message' => 'Kategori berhasil ditambahkan'
    ]);
}

    public function update($id = null)
    {
        $data = $this->request->getRawInput();
        if ($this->model->update($id, $data)) {
            return $this->respond(['status' => true, 'message' => 'Kategori berhasil diupdate']);
        }
        return $this->failValidationErrors($this->model->errors());
    }

    public function delete($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) return $this->failNotFound('Kategori tidak ditemukan');
        
        $this->model->delete($id);
        return $this->respondDeleted(['status' => true, 'message' => 'Kategori berhasil dihapus']);
    }
}