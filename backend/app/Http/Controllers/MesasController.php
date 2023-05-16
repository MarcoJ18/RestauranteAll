<?php

namespace App\Http\Controllers;

use App\Http\Requests\MesaRequest;
use App\Http\Resources\MesasCollection;
use App\Models\Mesas;
use Illuminate\Http\Request;

class MesasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new MesasCollection(Mesas::whereNotNull('mesa')->whereNotNull('current_mesa')->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(MesaRequest $request)
    {
        $data = $request->validated();
        $user = Mesas::create([
            'nombre' => $data['nombre'],
            'current_mesa'=>$data['current_mesa'],
            'mesa' => $data['mesa']

        ]);

        return [
            'token' => $user->createToken('token')->plainTextToken,
            'user' => $user
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
  
        Mesas::where('id', $id)
        ->update(['current_mesa' => $request->input(0)]);
        
        return 'Success';

        
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
