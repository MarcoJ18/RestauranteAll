<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    public function mesas(){
       return $this->belongsTo(Mesas::class);
    }

    public function productos(){
        return $this->belongsToMany(Producto::class,'pedido_productos')->withPivot('cantidad');
     }
}
