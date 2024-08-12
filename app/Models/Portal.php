<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portal extends Model
{
    use HasFactory;
    protected $primaryKey = "periode";
    public $incrementing = false;
    protected $keyType = 'string';
    protected $guarded = [];

    public function utusan()
    {
        return $this->hasMany(Utusan::class, 'periode');
    }
}