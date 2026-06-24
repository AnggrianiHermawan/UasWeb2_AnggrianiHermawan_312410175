<?php
namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use App\Models\BarangModel;

class Barang extends ResourceController
{
    protected $modelName = BarangModel::class;
    protected $format    = 'json';

    public function index()
    {
        // Pastikan format kembaliannya selalu sama: { "data": [...] }
        return $this->respond(['data' => $this->model->findAll()]);
    }

    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) return $this->failNotFound('Barang tidak ditemukan');
        return $this->respond($data);
    }

    public function create()
    {
        $model = new \App\Models\BarangModel();
        $json = $this->request->getJSON();

        $data = [
            'nama_barang' => $json->nama_barang,
            'stok'        => $json->stok,
            'harga'       => $json->harga,
            'kategori_id' => $json->kategori_id ?? 1 
        ];

        if ($model->insert($data)) {
            return $this->respondCreated(['status' => true, 'message' => 'Barang ditambah']);
        } else {
            return $this->fail($model->errors()); 
        }
    }

    public function update($id = null)
    {
        // PENTING: Gunakan getJSON() agar Vue (Axios) bisa mengirim data dengan benar
        $json = $this->request->getJSON();
        
        $data = [
            'nama_barang' => $json->nama_barang,
            'stok'        => $json->stok,
            'harga'       => $json->harga,
            'kategori_id' => $json->kategori_id ?? 1
        ];

        if ($this->model->update($id, $data)) {
            return $this->respond(['status' => true, 'message' => 'Barang berhasil diupdate']);
        }
        return $this->failValidationErrors($this->model->errors());
    }

    public function delete($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) return $this->failNotFound('Barang tidak ditemukan');
        
        $this->model->delete($id);
        return $this->respondDeleted(['status' => true, 'message' => 'Barang berhasil dihapus']);
    }
}